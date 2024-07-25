<template>
    <Navbar
        @view-profile="setProfile"
        @view-chat-drop="setChatDrop"
        @add-chat="addChat"
        :viewChatDrop="viewChatDrop"
    />
    <Search />
    <ChatList
        :typing="typing"
        :sender="sender"
        :receiver="receiver"
        @change-view="changeView"
    />
    <Profile :viewProfile="viewProfile" @view-profile="setProfile" />

    <AddChat :viewAddChat="viewAddChat" Verviant @view-add-chat="addChat" />
</template>

<script setup>
import { ref, defineEmits } from "vue";
import Navbar from "@/components/chats/Navbar.vue";
import Search from "@/components/chats/Search.vue";
import ChatList from "@/components/chats/ChatList.vue";
import Profile from "@/components/profiles/UserProfile.vue";
import AddChat from "@/components/chats/AddChat.vue";

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

const viewProfile = ref(false);
const viewChatDrop = ref(false);
const viewAddChat = ref(false);

const emits = defineEmits(["change-view"]);

const setProfile = (profileState) => {
    viewProfile.value = profileState;
};

const addChat = (data) => {
    viewAddChat.value = data;
};

const setChatDrop = (chatDropState) => {
    viewChatDrop.value = chatDropState;
};

const changeView = (isDefault) => {
    emits("change-view", false);
};
</script>
