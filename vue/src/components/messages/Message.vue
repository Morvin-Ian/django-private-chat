<template>
    <div
        v-if="message.dialog === chatStore.activeChat.dialog"
        :class="
            userId !== message.sender
                ? 'message-container-received'
                : 'message-container-sent'
        "
    >
        <div class="message">
            <div class="message-body">
                <div v-if="message.file" class="file">
                    <template v-if="isImage(file)">
                        <img :src="file" alt="file" />
                    </template>
                    <template v-else-if="isVideo(file)">
                        <video width="320" height="240" autoplay loop>
                            <source :src="file" type="video/mp4" />
                        </video>
                    </template>
                    <template v-else>
                        <a :href="file" target="_blank">Download Document</a>
                    </template>
                </div>

                <div class="text">
                    <span>{{ message.text }}</span> <br />
                    <small class="time">
                        {{ formatDateTime(message.created_at).date }}
                        {{ formatDateTime(message.created_at).time }}
                        <font-awesome-icon
                            v-if="userId === message.sender"
                            :style="{
                                color: message.read ? 'aqua' : 'inherit',
                            }"
                            class="tick-icon"
                            :icon="
                                message.read
                                    ? ['fas', 'check-double']
                                    : ['fas', 'check']
                            "
                        />
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { formatDateTime } from "@/utils/helpers";
import { useChatStore } from "@/stores/chats";
import { baseUrl } from "@/stores/axios-instance";

const chatStore = useChatStore();

const props = defineProps({
    message: {
        type: Object,
        required: true,
    },
});

const file = `${baseUrl}${props.message.file}`;

const userId = computed(() => {
    return JSON.parse(localStorage.getItem("user")).uuid;
});

const isImage = (file) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = file.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
};

const isVideo = (file) => {
    const videoExtensions = ["mp4", "mkv", "avi"];
    const extension = file.split(".").pop().toLowerCase();
    return videoExtensions.includes(extension);
};
</script>

<style scoped>
.message-container-received {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
}

.message-container-sent {
    display: flex;
    gap: 10px;
    margin: 10px;
    flex-direction: row-reverse;
}

.message-container-received .message {
    background: #202c33;
    color: #b6b6b6;
    padding: 10px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
}

.message-container-sent .message {
    background-color: #075e54;
    color: #fff;
    padding: 10px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
}

.file img {
    height: 250px;
    min-width: 200px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;
}

.no-file {
    display: none;
}

.text .time {
    float: right;
    color: #b6b6b6;
}

.icon {
    cursor: pointer;
    float: right;
    visibility: hidden;
}

.message-container-sent .message:hover .icon,
.message-container-received .message:hover .icon {
    visibility: visible;
}
</style>
