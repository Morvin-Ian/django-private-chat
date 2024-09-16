<template>
    <ul class="drop-list">
        <li @click="deleteRelationship(chat?.chat_uuid)">Unfriend {{ chat?.chat }}</li>
        <li @click="clearMessages(chat?.chat_uuid)">Clear Messages</li>
        <li @click="logout">Log out</li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useRelationshipsStore } from '@/stores/relationships';
import { useChatStore } from '@/stores/chats';

const toast = useToast();
const router = useRouter()
const relationshipStore = useRelationshipsStore();
const chatStore = useChatStore();
const loggedUser = JSON.parse(localStorage.getItem("user"));

const props = defineProps({
    chat: {
        type: Object,
        required: true,
    }
})

const logout = () =>{
    localStorage.removeItem('user');
    router.push('/sign-in');
}

const deleteRelationship = async (receiver) => {
    const response = await relationshipStore.deleteRelationships({
        receiver: receiver,
        sender: loggedUser.uuid,
        del_dialog:true
    });
   

    if (response == 204) {
        await relationshipStore.fetchUsers();
        await relationshipStore.fetchRelationships();
        await chatStore.getChats();
        toast.success("Chat Deleted");
    } else {
        toast.error("An error occured");
    }
};

const clearMessages = async (receiver) => {
    const response = await relationshipStore.deleteRelationships({
        receiver: receiver,
        sender: loggedUser.uuid
    });

    if (response == 200) {
        await relationshipStore.fetchUsers();
        await relationshipStore.fetchRelationships();
        await chatStore.getChats();
        toast.success("Messages Cleared Succesfully");
    } else {
        toast.error("An error occured");
    }
};

</script>

<style scoped>
    .drop-list{
        position: absolute;
        background: #202C33;
        width: 50%;
        right: 15%;
        padding: 5px 20px;
        border: 1px solid #b6b6b6;
        border-radius: 5px;
    }

    .drop-list li{
        color: #b6b6b6;
        margin-top:10px;
        list-style: none;
        cursor:pointer;
        padding: 5px;

    }

    .drop-list li:hover{
        background-color: #0d161b;
    }
</style>