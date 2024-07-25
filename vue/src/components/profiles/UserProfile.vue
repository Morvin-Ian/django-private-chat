<template>
    <div :class="viewProfile ? 'profile-container' : 'profile-hidden'">
        <div class="top">
            <div class="arrow">
                <font-awesome-icon
                    @click="hideProfile"
                    class="icon"
                    :icon="['fas', 'arrow-left']"
                />
            </div>
            <div class="title">
                <span>Profile</span>
            </div>
        </div>

        <form class="edit-profile">
            <div class="profile-image">
                <input
                    type="file"
                    accept="image/*"
                    id="profile"
                    @change="handleFileChange"
                />
                <label for="profile">
                    <img
                        :src="
                            user.profile
                                ? `${baseUrl}${user.profile}`
                                : `${profilePicture}`
                        "
                    />
                </label>
            </div>

            <div class="username">
                <label class="input-label">Your Name</label> <br />
                <input class="username-input" type="text" v-model="username" />
                <small
                    >This is not your username or pin. This name will be visible
                    to your contacts</small
                >
            </div>
            <div class="about">
                <label class="input-label">Email</label> <br />
                <input class="about-input" type="text" v-model="email" />
            </div>

            <div class="submit">
                <button @click.prevent="handleSubmit">Edit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import profilePicture from "@/assets/default.jpg";
import { ref, defineProps, defineEmits } from "vue";
import { useProfileStore } from "@/stores/edit-profile";
import { baseUrl } from "@/stores/axios-instance";
import { useToast } from "vue-toastification";

const emits = defineEmits(["view-profile"]);
const toast = useToast();
const user = JSON.parse(localStorage.getItem("user"));
const profileStore = useProfileStore();
const username = ref(user.username);
const email = ref(user.email);
const editedProfile = ref(null);

const props = defineProps({
    viewProfile: {
        type: Boolean,
        required: true,
    },
});

const hideProfile = () => {
    emits("view-profile", false);
};

const handleFileChange = (event) => {
    editedProfile.value = event.target.files[0];
};

const handleSubmit = async () => {
    const response = await profileStore.editProfile({
        username: username.value,
        email: email.value,
        profile: editedProfile.value,
    });

    if (user) {
        user.profile = response.profile;
        user.username = response.username;
        user.email = response.email;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Profile Updated");
    } else {
        toast.error("An Error occured while Updating the Profile ");
    }
};
</script>

<style scoped>
.profile-container {
    position: absolute;
    border-right: 1px solid rgb(78, 78, 78);
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
    opacity: 0;
    max-height: 0;
    visibility: hidden;
}

.profile-container .top {
    display: flex;
    background-color: #141c20;
    padding: 20px;
}

.top .arrow {
    cursor: pointer;
    font-size: large;
}

.top .title {
    margin-left: 20%;
}

.profile-image {
    padding: 25px;
}

.profile-image img {
    border-radius: 50%;
    width: 260px;
    height: 260px;
    cursor: pointer;
    transition:
        width 0.5s ease,
        height 0.5s ease;
}

.profile-image img:hover {
    border-radius: 50%;
    width: 255px;
    height: 255px;
}

#profile {
    display: none;
}

.input-label {
    color: #075e54;
}

.username,
.about,
.submit {
    padding: 5px 20px;
}

.submit button {
    width: 97%;
    cursor: pointer;
    background-color: #075e54;
    color: #b6b6b6;
    font-weight: bolder;
    border: none;
    padding: 10px;
}

.username-input,
.about-input {
    background-color: #141c20;
    color: #b6b6b6;
    border: none;
    padding: 10px;
    margin-top: 10px;
    width: 90%;
}
.about-input:focus {
    border: none;
}
</style>
