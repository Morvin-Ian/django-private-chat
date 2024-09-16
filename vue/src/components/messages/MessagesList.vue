<template>
    <div class="messages-container" ref="messagesContainer">
      <div class="message" v-for="message in messageStore.messages" :key="message.id">
        <Message :message="message" />
      </div>
    </div>
  </template>
  
  <script setup>
  import Message from "@/components/messages/Message.vue"
  import { useMessagesStore } from "@/stores/messages.js"
  import { useChatStore } from "@/stores/chats";
  import { useSocketStore } from "@/stores/socket";
  import { onMounted, watch, ref, nextTick } from "vue";
  
  const messageStore = useMessagesStore()
  const socketStore = useSocketStore()
  const chatStore = useChatStore()
  const user = JSON.parse(localStorage.getItem("user"))
  const emits = defineEmits(["typing"])
  const messagesContainer = ref(null)
  
  // Smooth scroll to bottom function
  const scrollToBottom = (immediate = false) => {
    nextTick(() => {
      if (messagesContainer.value) {
        const scrollOptions = {
          top: messagesContainer.value.scrollHeight,
          behavior: immediate ? 'auto' : 'smooth'
        };
        messagesContainer.value.scrollTo(scrollOptions);
      }
    })
  }
  
  // fetch Messages
  messageStore.fetchMessages(user.token).then(() => {
    scrollToBottom(true) // Immediate scroll on initial load
  })
  
  watch(() => socketStore.socket, (newSocket, oldSocket) => {
    if (newSocket) {
      newSocket.onmessage = () => {
        chatStore.getChats(user.token);
        messageStore.fetchMessages(user.token).then(() => {
          scrollToBottom()
        });
      };
    }
  });
  
  watch(() => messageStore.messages, () => {
    scrollToBottom()
  }, { deep: true })
  
  onMounted(() => {
    socketStore.socket.onmessage = (response) => {
      const data = JSON.parse(response.data)
      if (!data.response.typing) {
        chatStore.getChats(user.token)
        messageStore.fetchMessages(user.token).then(() => {
          scrollToBottom()
        })
        emits("typing", data.response)
      } else {
        emits("typing", data.response)
      }
    }
    scrollToBottom(true) // Immediate scroll on mount
  })
  </script>
  
  <style scoped>
  .messages-container {
    height: 80vh;
    margin-bottom: 5px;
    overflow-y: auto;
    background: url('../../assets/bg.jpg');
    scroll-behavior: smooth;
  }
  </style>