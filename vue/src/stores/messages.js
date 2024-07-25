import { defineStore } from "pinia";
import { instance } from "./axios-instance";

export const useMessagesStore = defineStore({
  id: "messages",
  state: () => ({
    messages: [],
    file: null,
  }),
  actions: {
    async fetchMessages(access_token) {
      try {
        const response = await instance.get("/messages/list/");

        if (response.status != 200) {
          throw new Error("Failed to fetch messages");
        } else {
          this.messages = response.data;
        }
      } catch (error) {
        console.error("Fetch messages error:", error);
        return error.message;
      }
    },

    async updateMessageRead(access_token, dialog) {
      try {
        const response = await instance.put("/messages/read/", { dialog });

        if (response.status != 200) {
          throw new Error("Failed to update message read status");
        } else {
          return "Message read status updated successfully";
        }
      } catch (error) {
        console.error("Update message read error:", error);
        return error.message;
      }
    },
    async setFile(file) {
      this.file = file;
    },

    async sendFile(access_token, file, sender) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("uploaded_by", sender);

      try {
        const response = await instance.post(
          "/messages/upload_file/",
          formData,
        );

        if (response.status != 201) {
          throw new Error(`Error uploading file: ${response.statusText}`);
        }
        return await response.data;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
  },
});
