from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # re_path(r"ws/chat/(?P<uuid>[0-9a-f-]+)/", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/chat/brace/", consumers.ChatConsumer.as_asgi()),

]