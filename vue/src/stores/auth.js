// store/auth.js
import { defineStore } from "pinia";
import { instance } from "./axios-instance";


export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    uuid: null,
  }),
  actions: {
    async authenticate(credentials) {
      try {
        const response = await instance.post("/auth/login/", credentials);
        return response.data;
      } catch (error) {
        return error.response;
      }
    },
    async registration(credentials) {
      try {
        const response = await instance.post("auth/register/", credentials);
        return { status: response.status, data: response.data };
      } catch (error) {
        return {
          status: error.response.status,
          error: error.response.data,
        };
      }
    },
  },
});
