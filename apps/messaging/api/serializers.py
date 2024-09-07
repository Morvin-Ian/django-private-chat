from rest_framework import serializers
from messaging.models import Message, UploadedFile

from rest_framework import serializers
from messaging.models import Message, UploadedFile

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.UUIDField(source='sender.uuid')
    recepient = serializers.UUIDField(source='recepient.uuid')
    file = serializers.SerializerMethodField()
    dialog = serializers.PrimaryKeyRelatedField(read_only=True, source='dialog.id')

    class Meta:
        model = Message
        fields = [
            'id', 'sender', 'recepient', 'text', 
            'file', 'read', 'dialog', 'created_at'
        ]

    def get_file(self, obj):
        if obj.file:
            try:
                return UploadedFile.objects.get(file=obj.file).file.url
            except UploadedFile.DoesNotExist:
                return None
        return None

        

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ('id', 'uploaded_by', 'file') 
        read_only_fields = ['id']
