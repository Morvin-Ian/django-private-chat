<template>
    <div class="chat-list">
        <div v-if="chatStore.sortedChats.length > 0" class="chat" v-for="chat in chatStore.sortedChats" :key="chat.id">
            <Chat
                :typing="typing"
                :sender="sender"
                :receiver="receiver"
                @click="setActiveChat(chat)"
                :chat="chat"
                @contextmenu="displayChatPopup($event, chat)"
            />
        </div>

        <div v-else class="no-list">
            <p>Add Relationships ('+' Icon on top)</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useChatStore } from "@/stores/chats.js";
import { useMessagesStore } from "@/stores/messages";
import Chat from "@/components/chats/Chat.vue";

const props = defineProps({
    typing: {
        type: Boolean,
        required: true,
    },
    sender: {
        type: String,
        required: false,
    },
    receiver: {
        type: String,
        required: false,
    },
});

const chatStore = useChatStore();
const messageStore = useMessagesStore();
const emits = defineEmits(["change-view"]);

const setActiveChat = (chat) => {
    chatStore.setChat(chat);
    messageStore.updateMessageRead(chatStore.activeChat.dialog);
    emits("change-view", false);
};

const displayChatPopup = (event, chat) => {
    event.preventDefault(); 
    chatStore.setChat(chat); 
}

onMounted(async () => {
    await chatStore.getChats();
});
</script>

<style scoped>
.chat-list {
    margin-top: 5px;
    height: 85vh;
    overflow-y: scroll;
}

.no-list{
    margin-left: 10px;
    color: #b6b6b6;
    font-weight: bolder;
    font-style: italic;
}
</style>
