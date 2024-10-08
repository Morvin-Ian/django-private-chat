from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework.views import Response
from rest_framework import status

from apps.messaging.models import Message, Dialog, UploadedFile
from apps.accounts.models import User

from django.db.models import Q
from django.core.cache import cache

from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UploadedFileSerializer, MessageSerializer

import os
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

class DialogView(GenericAPIView):
    """Gets the dialogues of a user"""
    permission_classes = [IsAuthenticated]
    def get_file_type(self, file):
        if not file:
            return None
        file_name = str(file)
        if file_name.endswith(('.doc', '.docx', '.pdf')):
            return 'document'
        elif file_name.endswith(('.png', '.jpg', '.jpeg', '.gif')):
            return 'image'
        elif file_name.endswith(('.mkv', '.mp4', '.avi', '.mov')):
            return 'video'
        else:
            return 'other'

    def get(self, request):
        user = request.user
        dialogs = Dialog.objects.filter(
            Q(sender=user) | Q(recepient=user)
        ).select_related('sender', 'recepient').prefetch_related('message_set')
        
        response = []
        for dialog in dialogs:
            chat_user = dialog.recepient if dialog.sender == user else dialog.sender
            profile = chat_user.profile.url if chat_user.profile else None
            messages = dialog.message_set.filter(
                Q(sender=user, recepient=chat_user) |
                Q(sender=chat_user, recepient=user)
            ).order_by('-created_at')
            unread_count = messages.filter(read=False, recepient=user).count()
            last_message = messages.first()
            
            data = {
                "chat": chat_user.username,
                "chat_uuid": chat_user.uuid,
                "profile": profile,
                "dialog": dialog.id,
                "user": user.uuid,
                "last_message": last_message.text if last_message else None,
                "last_message_file_type": self.get_file_type(last_message.file) if last_message and last_message.file else False,
                "last_message_sender": last_message.sender.uuid if last_message else None,
                "unread_count": unread_count,
                "date": last_message.created_at if last_message else None
            }
            response.append(data)
        
        return Response(response, status=status.HTTP_200_OK)

class MessageListView(GenericAPIView):
    """Requests for all messages or creates new"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = Message.objects.filter(
            Q(sender=request.user) | Q(recepient=request.user)
        ).select_related('sender', 'recepient', 'dialog').order_by('created_at')

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateDialogView(GenericAPIView):
    """Creates a dialog between users"""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        sender = request.data.get('sender', None)
        receiver = request.data.get('receiver', None)

        sender_instance = User.objects.get(uuid=sender)
        receiver_instance = User.objects.get(uuid=receiver)

        if sender_instance and receiver_instance:

            dialog = Dialog.objects.create(
                sender=sender_instance, recepient=receiver_instance)
            return Response({"dialog": dialog.id}, status=status.HTTP_200_OK)
        else:
            return Response("Invalid users provided", status=status.HTTP_400_BAD_REQUEST)

class DeleteDialog(GenericAPIView):
    """Deletes a dialog between users"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        sender = request.data.get('sender')
        receiver = request.data.get('receiver')
        del_dialog = request.data.get('del_dialog', False)

        sender_instance = User.objects.get(uuid=sender)
        receiver_instance = User.objects.get(uuid=receiver)

        if sender_instance and receiver_instance:
            dialog = Dialog.objects.get(Q(sender_id=sender_instance) & Q(recepient_id=receiver_instance) | Q(sender_id=receiver_instance) & Q(recepient_id=sender_instance))
            if dialog:
                messages = Message.objects.filter(dialog=dialog.id)
                for message in messages:
                    message.delete()
                if not del_dialog:
                    return Response("Message deleted", status=status.HTTP_200_OK)
                else:
                    dialog.delete()
                    return Response("Dialog and Messages Deleted", status=status.HTTP_204_NO_CONTENT)
            else:
                return Response("Dialog Not Found", status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("Error Encountered",  status=status.HTTP_400_BAD_REQUEST)


class UpdateReadMessages(GenericAPIView):
    """Update messages to read in a dialog between users"""

    def put(self, request):
        dialog_id = request.data.get("dialog")
        message_list = Message.objects.filter(dialog=dialog_id)

        if message_list:
            for message in message_list:
                if message.read == False:
                    if message.recepient == request.user:
                        message.read = True
                        message.save()

        return Response("Message Read", status=status.HTTP_200_OK)



class FileUploadView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        uploaded_by_id = request.data.get('uploaded_by')
        file = request.data.get('file')
        sender = User.objects.get(uuid=uploaded_by_id)

        uploaded_file = UploadedFile.objects.create(
            uploaded_by = sender,
            file = file
        )

        serializer = UploadedFileSerializer(uploaded_file)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
