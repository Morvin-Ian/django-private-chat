// store/relationships.js
import { defineStore } from 'pinia';
import { messageUrl, base } from './auth';

export const useRelationshipsStore = defineStore({
  id: 'relationships',
  actions: {
    async fetchRelationships(access_token) {
      try {
        const relationshipsUrl = `${messageUrl}/api/messages/chats/`;
        const response = await fetch(relationshipsUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          throw new Error('Failed to fetch relationships');
        }

        return await response.json();
      } catch (error) {
        console.error('Fetch relationships error:', error);
        return error.message;
      }
    },

    async createRelationships(access_token, data) {
      try {
        const response = await fetch(`${messageUrl}/add_dialog/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          return response.status
        }
        return response.status;

      } catch (error) {
        return error.message;
      }
    },
  },
});
