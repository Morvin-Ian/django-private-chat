<template>
    <div class="login-page">
        <div class="login-container">
            <h2 style="text-align: center; color: white">Sign Up</h2>
            <p class="error">{{ error }}</p>
            <form @submit.prevent="register">
                <input
                    type="text"
                    placeholder="Username"
                    v-model="username"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p style="color: white; text-align: center">
                Already have an account? <a href="/sign-in">Sign In</a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const store = useAuthStore();
const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"));

const register = async () => {
    if (password.value && email.value) {
        const response = await store.register({
            username: username.value,
            email: email.value,
            password: password.value,
        });

        if (response.success) {
            router.push("/sign-in");
        } else {
            if (response.error.username) {
                error.value = response.error.username[0];
            } else if (response.error.email) {
                error.value = response.error.email[0];
            } else {
                error.value = "An error occurred during registration.";
            }
        }
    }
};

onMounted(() => {
    if (user && user.token) {
        router.push("/");
    }
});
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #202c33;
}

.login-container {
    background-color: #1d1d1d;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="email"],
input[type="password"],
button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
}

button {
    cursor: pointer;
    background-color: #202c33;
}

button:hover {
    background-color: #0e1417;
}

.error {
    color: red;
    text-align: center;
    margin-bottom: 10px;
    font-size: small;
}
</style>
