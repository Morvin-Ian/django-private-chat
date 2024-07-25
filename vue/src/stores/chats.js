import { defineStore } from "pinia";
import { messageUrl } from "./auth";
import { base } from "./auth";
import { instance } from "./axios-instance";

export const useChatStore = defineStore("chats", {
  state: () => {
    return {
      chats: [],
      activeChat: [],
    };
  },

  actions: {
    async getChats() {
      try {
        const response = await instance.get("/messages/chats/");

        if (response.status == 403) {
          localStorage.clear();
          location.assign("/sign-in");
          return;
        }
        this.chats = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    },
    async addChat(uuids) {
      const response = await instance.post("/messages/add_dialog/", uuids);

      if (response.status == 403) {
        localStorage.clear();
        location.assign("/sign-in");
        return;
      } else {
        return response.data;
      }
    },

    deleteChat(id) {
      this.chats = this.chats?.filter((chat) => chat.id !== id);
    },

    async setChat(chat) {
      try {
        this.activeChat = chat;
      } catch (error) {
        console.error("Error setting chat", error);
      }
    },
  },
  getters: {
    sortedChats() {
      return this.chats?.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
});
