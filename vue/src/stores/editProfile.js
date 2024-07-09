// store/profile.js
import { defineStore } from "pinia";
import { authUrl, messageUrl } from "./auth";
import { useAuthStore, base } from "./auth";

const authStore = useAuthStore();

export const useProfileStore = defineStore({
  id: "profile",
  actions: {
    async editProfile(profileData, access_token) {
      try {
        const editProfileUrl = `${authUrl}/edit_user/`;

        const formDataObject = new FormData();
        formDataObject.append("username", profileData.username);
        formDataObject.append("email", profileData.email);
        if (profileData.profile) {
          formDataObject.append(
            "profile",
            profileData.profile,
            profileData.profile.name
          );
        }
        const response = await fetch(editProfileUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formDataObject,
        });

        const data = await response.json();

        if (!response.ok) {
          return data;
        } else {
          authStore.profile = data.profile;
          authStore.email = data.email;
          authStore.username = data.username;
        }
      } catch (error) {
        console.error("Profile edit error:", error);
      }
    },
  },
});
