<template>
    <ul class="drop-list">
        <li>Contact Info</li>
        <li>Select messages</li>
        <li @click="closeChat" >Close chat</li>
        <li>Mute notification</li>
        <li>Dissapearing messages</li>
        <li>Clear chat</li>
        <li>Delete chat</li>
        <li>Report</li>
        <li>Block</li>
    </ul>
</template>

<script setup>
const emits = defineEmits(['close-chat'])

const closeChat= () => {
    emits('close-chat', true)
}
</script>

<style scoped>
    .drop-list{
        position: absolute;
        top:8%;
        right:3%;
        background: #202C33;
        padding:5px;
        width: 20%;
        border: 1px solid #b6b6b6;
        border-radius: 5px;
    }

    .drop-list-no{
        visibility: hidden;

    }

    .drop-list li{
        color: #b6b6b6;
        margin-top:10px;
        list-style: none;
        cursor:pointer;
        padding:5px 20px;

    }
    .drop-list li:hover{
        background-color: #0d161b;
    }
</style>