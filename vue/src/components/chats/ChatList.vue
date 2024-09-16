<template>
    <div class="chat-list">
        <div v-if="chatStore.sortedChats.length > 0" class="chat" v-for="chat in chatStore.sortedChats" :key="chat.id">
            <div class="chat-wrapper" @contextmenu.prevent="displayChatPopup($event, chat)">
                <Chat :typing="typing" :sender="sender" :receiver="receiver" @click="setActiveChat(chat)" :chat="chat" />
                <ChatOptionsDropDown :chat="chat" v-if="chat.showDropDown" class="chat-dropdown" />
            </div>
        </div>
        <div v-else class="no-list">
            <p>Add Relationships ('+' Icon on top)</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useChatStore } from "@/stores/chats.js";
import { useMessagesStore } from "@/stores/messages";
import Chat from "@/components/chats/Chat.vue";
import ChatOptionsDropDown from "../dropdowns/ChatOptionsDropDown.vue";

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
    chatStore.sortedChats.forEach(c => {
        if (c.id !== chat.id) {
            c.showDropDown = false;
        }
    });
    
    chat.showDropDown = !chat.showDropDown;
};

onMounted(async () => {
    await chatStore.getChats();
    chatStore.sortedChats.forEach(chat => {
        chat.showDropDown = false;
    });
});
</script>

<style scoped>
.chat-list {
    margin-top: 5px;
    height: 85vh;
    overflow-y: scroll;
}

.no-list {
    margin-left: 10px;
    color: #b6b6b6;
    font-weight: bolder;
    font-style: italic;
}

.chat-wrapper {
    position: relative;
}

.chat-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
}
</style>