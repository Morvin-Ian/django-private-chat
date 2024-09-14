import { defineStore } from "pinia";
import { instance } from "./axios-instance";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async authenticate(credentials) {
      try {
        const response = await instance.post("/auth/login/", credentials);
        this.setUser(response.data.user);
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false, error: error.response.data };
      }
    },

    async register(credentials) {
      try {
        const response = await instance.post("/auth/register/", credentials);
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false, error: error.response.data };
      }
    },

    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },

  getters: {
    userUuid: (state) => state.user?.uuid,
  },
});