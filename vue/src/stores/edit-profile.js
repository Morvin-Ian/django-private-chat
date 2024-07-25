// store/profile.js
import { defineStore } from "pinia";
import { instance } from "./axios-instance";

export const useProfileStore = defineStore({
  id: "profile",
  actions: {
    async editProfile(profileData) {
      try {
        const formDataObject = new FormData();
        formDataObject.append("username", profileData.username);
        formDataObject.append("email", profileData.email);

        if (profileData.profile) {
          formDataObject.append(
            "profile",
            profileData.profile,
            profileData.profile.name,
          );
        }

        const response = await instance.put("/auth/edit_user/", formDataObject);

        if (response.status !== 200) {
          console.error("Error response:", response.data);
          return response.data;
        } else {
          return response.data;
        }
      } catch (error) {
        console.error("Profile edit error:", error);
      }
    },
  },
});
