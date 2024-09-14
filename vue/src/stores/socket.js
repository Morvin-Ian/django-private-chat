import { defineStore } from "pinia";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null,
  }),
  actions: {
    async setSocket(host, port, path) {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.socket = new WebSocket(`${protocol}//${host}:${port}${path}`);
      } catch (error) {
        console.error("Error setting Socket", error);
      }
    },
  }
});