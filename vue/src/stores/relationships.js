// store/relationships.js
import { defineStore } from "pinia";
import { instance } from "./axios-instance";

export const useRelationshipsStore = defineStore({
  id: "relationships",
  actions: {
    async fetchRelationships() {
      try {
        const response = await instance.get("/messages/chats");

        if (response.status != 200) {
          localStorage.clear();
          throw new Error("Failed to fetch relationships");
        } else {
          return await response.data;
        }
      } catch (error) {
        console.error("Fetch relationships error:", error);
        return error.message;
      }
    },

    async fetchUsers() {
      try {
        const response = await instance.get("/auth/users/");
        if (response.status != 200) {
          localStorage.clear();
          throw new Error("Failed to fetch users");
          return;
        }

        return response.data;
      } catch (error) {
        console.error("Fetch users error:", error);
        return [];
      }
    },

    async createRelationships(data) {
      try {
        const response = await instance.post("/messages/add_dialog/", data);

        if (response.status != 200) {
          return response.status;
        } else {
          return response.status;
        }
      } catch (error) {
        return error.message;
      }
    },
  },
});
