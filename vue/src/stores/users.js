// store/users.js
import { defineStore } from 'pinia';
import { base, authUrl } from './auth';

export const useUsersStore = defineStore({
  id: 'users',
  actions: {
    async fetchUsers(access_token) {
      try {
        const usersApiUrl = `${authUrl}/users/`;
        const response = await fetch(usersApiUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          throw new Error('Failed to fetch users');
        }

        return await response.json();
      } catch (error) {
        console.error('Fetch users error:', error);
        return [];
      }
    },
  },
});
