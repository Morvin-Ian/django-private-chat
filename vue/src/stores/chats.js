import { defineStore } from "pinia";
import { messageUrl } from "./auth";


export const useChatStore = defineStore("chats", {
    state: () => {
        return {
            chats: [],
        };
    },

    actions: {
        async getChats(access_token) {
            try {

                const response = await fetch(`${messageUrl}/chats/`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.status == 403){
                    localStorage.clear()
                    location.assign("/sign-in")
                    return
                }

                this.chats = data;
                return data

            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        },
        async addChat(access_token, uuids) {

            const response = await fetch(`${messageUrl}/api/messages/add_dialog/`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(uuids)
            })

            const data = await response.json();
            if (response.status == 403){
                localStorage.clear()
                location.assign("/sign-in")
                return
            }

            if (!response.ok) {
                return data
            }
            else {
                return data
            }

        },

        deleteChat(id) {
            this.chats = this.chats?.filter((chat) => chat.id !== id);
        },

    },
    getters: {
        sortedChats() {
            return this.chats?.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

});
