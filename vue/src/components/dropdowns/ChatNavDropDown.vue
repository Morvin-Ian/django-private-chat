<template>
    <ul class="drop-list">
        <li>New group</li>
        <li>New community</li>
        <li>Starred messages</li>
        <li>Clear chats</li>
        <li>Select chat</li>
        <li>Settings</li>
        <li @click="logout">Log out</li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const logout = () =>{
    localStorage.removeItem('user');
    router.push('/sign-in');
}

</script>

<style scoped>
    .drop-list{
        position: absolute;
        top:6%;
        right:56%;
        background: #202C33;
        width: 15%;
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