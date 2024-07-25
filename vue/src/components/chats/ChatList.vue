<template>
    <div class="chat-list">
        <div class="chat" v-for="chat in chatStore.sortedChats" :key="chat.id">
            <Chat
                :typing="typing"
                :sender="sender"
                :receiver="receiver"
                @click="setActiveChat(chat)"
                :chat="chat"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useChatStore } from "@/stores/chats.js";
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
const emits = defineEmits(["change-view"]);

const setActiveChat = (chat) => {
    chatStore.setChat(chat);
    emits("change-view", false);
};

onMounted(async () => {
    const response = await chatStore.getChats();
    if (response.status == 403) {
        localStorage.clear();
        window.location.assign("/sign-in");
    }
});
</script>

<style scoped>
.chat-list {
    margin-top: 5px;
    height: 85vh;
    overflow-y: scroll;
}
</style>
