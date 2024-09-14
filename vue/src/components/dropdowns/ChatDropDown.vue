<template>
    <ul class="drop-list">
        <li>Starred messages</li>
        <li>Clear Messages</li>
        <li>Delete Chat</li>
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
        top:8%;
        left:10%;
        background: #202C33;
        width: 15%;
        padding: 5px 20px;

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