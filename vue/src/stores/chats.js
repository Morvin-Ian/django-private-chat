import { defineStore } from "pinia";
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
        this.chats = response.data;
        return response.data;
      } catch (error) {
        if (error?.response?.status == 403) {
          localStorage.clear();
          location.assign("/sign-in");
          return;
        }
      }
    },
    async addChat(uuids) {
      try {
        const response = await instance.post("/messages/add_dialog/", uuids);
        return response.data;

      } catch (error) {
        
        if (error?.response?.status == 403) {
          localStorage.clear();
          location.assign("/sign-in");
          return;
        }
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
