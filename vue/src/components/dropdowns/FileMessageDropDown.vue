<template>
    <ul class="drop-list">
        <li>
            <font-awesome-icon style="color: red" icon="images" />
            <label style="margin-left: 5px" for="mediaInput"
                >Photos & Videos</label
            >
            <input
                type="file"
                id="mediaInput"
                ref="mediaInput"
                style="display: none"
                @change="handleFileChange"
                accept="image/png, image/jpeg, video/mp4, video/mkv, video/avi"
            />
        </li>

        <li>
            <font-awesome-icon style="color: blue" icon="file" />
            <label style="margin-left: 5px" for="docsInput">Documents</label>
            <input
                type="file"
                id="docsInput"
                ref="docsInput"
                style="display: none"
                @change="handleFileChange"
                accept=".doc,.docx,.pdf,application/msword,application/pdf"
            />
        </li>
    </ul>
</template>

<script setup>
import { useMessagesStore } from "@/stores/messages";

const emits = defineEmits(["hide-file-drop"]);
const messageStore = useMessagesStore();

const handleFileChange = (event) => {
    const file = event.target.files[0];
    messageStore.setFile(file);
    emits("hide-file-drop", file);
};
</script>

<style scoped>
.drop-list {
    position: absolute;
    bottom: 5%;
    border-radius: 10px;
    left: 30%;
    background: #202c33;
    padding: 30px;
}

.drop-list-no {
    visibility: hidden;
}

label {
    cursor: pointer;
}

.drop-list li {
    color: #b6b6b6;
    list-style: none;
    cursor: pointer;
    padding: 10px;
}

.drop-list li:hover {
    background-color: #111f27;
}
</style>
