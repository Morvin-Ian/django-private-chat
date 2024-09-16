import { defineStore } from "pinia";
import { instance } from "./axios-instance";

export const useChatStore = defineStore("chats", {
  state: () => ({
    chats: [],
    activeChat: null
  }),

  actions: {
    async getChats() {
      try {
        const response = await instance.get("/messages/chats/");
        this.chats = response.data;
        return response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    async addChat(uuids) {
      try {
        const response = await instance.post("/messages/add_dialog/", uuids);
        return response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    deleteChat(id) {
      this.chats = this.chats.filter((chat) => chat.id !== id);
    },

    async setChat(chat) {
      try {
        this.activeChat = chat;
      } catch (error) {
        console.error("Error setting chat", error);
      }
    },

    handleError(error) {
      if (error?.response?.status === 403) {
        localStorage.clear();
        location.assign("/sign-in");
      } else {
        console.error("An error occurred:", error);
      }
    },
  },

  getters: {
    sortedChats() {
      return this.chats.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
});
