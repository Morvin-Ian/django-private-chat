import { defineStore } from 'pinia';
import { baseUrl } from './auth';

export const useMessagesStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [],
    file:null
  }),
  actions: {
    async fetchMessages(access_token) {
      try {
        const messagesUrl = `${baseUrl}/list/`;
        const response = await fetch(messagesUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        this.messages = data
        
      } catch (error) {
        console.error('Fetch messages error:', error);
        return error.message;
      }
    },

    async updateMessageRead(access_token, dialog) {
      try {
        const messagesReadUrl = `${baseUrl}/read/`;
        const response = await fetch(messagesReadUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dialog }),
        });

        if (!response.ok) {
          throw new Error('Failed to update message read status');
        }

        return 'Message read status updated successfully';
      } catch (error) {
        console.error('Update message read error:', error);
        return error.message;
      }
    },
    async setFile(file){
      this.file = file
    },

    async sendFile(access_token, file, sender) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('uploaded_by', sender);

      try {
        const response = await fetch(`${baseUrl}/upload_file/`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error uploading file: ${response.statusText}`);
        }
        
        return await response.json()

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
});
