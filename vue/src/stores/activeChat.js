import { defineStore } from "pinia";
import { messageUrl } from "./auth";

export const useActiveChatStore = defineStore("activeChat", {
    state: () => {
        return{
            activeChat: [],
        };
    },

    actions: {
        async setChat(chat){
            try {
                this.activeChat = chat;
                
            }catch (error) {
                console.error("Error setting chat", error);
            }
        },   
    }
});
