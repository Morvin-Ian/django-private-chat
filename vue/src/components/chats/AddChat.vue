<template>
    <div :class="viewAddChat ? 'profile-container' : 'profile-hidden'">
        <div class="top">
            <div class="arrow">
                <font-awesome-icon
                    @click="hideChat"
                    class="icon"
                    :icon="['fas', 'arrow-left']"
                />
            </div>
            <div class="title">
                <span>Create Relationships</span>
            </div>
        </div>
        <div class="user-list">
            <div
                v-if="users"
                v-for="user in users"
                :key="user.id"
                class="user-item"
            >
                <div class="user-info" v-if="loggedUser.uuid != user.uuid">
                    <img
                        :src="user.profile || defaultProfile"
                        alt="User avatar"
                        class="user-avatar"
                    />
                    <p class="user-name">{{ user.username }}</p>
                </div>
                <button
                    @click="createRelationship(user.uuid)"
                    class="add-button"
                >
                    <font-awesome-icon
                        @click="addChat"
                        class="icon"
                        :icon="['fas', 'plus']"
                    />
                </button>
            </div>

            <div v-if="!users">
                <h4 style="margin-left: 10px" class="user-info">
                    Wait for more users to join.
                </h4>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";
import { useRelationshipsStore } from "@/stores/relationships";
import { useChatStore } from "@/stores/chats";
import defaultProfile from "@/assets/default.jpg";
import { useToast } from "vue-toastification";

const toast = useToast();
const emits = defineEmits(["view-add-chat"]);
const relationshipStore = useRelationshipsStore();
const chatStore = useChatStore();
const loggedUser = JSON.parse(localStorage.getItem("user"));
const users = ref({});

const props = defineProps({
    viewAddChat: {
        type: Boolean,
        required: true,
    },
});

const hideChat = () => {
    emits("view-add-chat", false);
};

const fetchUsers = async () => {
    users.value = await relationshipStore.fetchUsers();
};

const createRelationship = async (receiver) => {
    const response = await relationshipStore.createRelationships({
        receiver: receiver,
        sender: loggedUser.uuid,
    });

    if (response == 200) {
        fetchUsers();
        await relationshipStore.fetchRelationships();
        await chatStore.getChats();
        toast.success("Relationship created succesfully");
    } else {
        toast.error("An error occured");
    }
};

onMounted(() => {
    fetchUsers();
});
</script>

<style scoped>
.profile-container {
    position: absolute;
    top: 0%;
    color: #b6b6b6;
    background: #202c33;
    width: 25%;
    height: 105vh;
    justify-content: center;
    visibility: visible;
    transition:
        opacity 1s ease,
        max-height 1s ease,
        visibility 1s ease;
}

.profile-hidden {
    transform: translateX(100%);
}

.top {
    display: flex;
    align-items: center;
    background-color: #141c20;
    padding: 25px;
}

.arrow {
    cursor: pointer;
    font-size: 20px;
    margin-right: 15px;
}

.title {
    font-size: 18px;
    font-weight: bold;
}

.user-list {
    padding: 15px;
}

.user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #2c3e50;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
}

.user-name {
    font-size: 16px;
}

.add-button {
    background-color: #075e54;
    color: #ffffff;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-button:hover {
    background-color: #064a43;
}
</style>
