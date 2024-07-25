// store/profile.js
import { defineStore } from "pinia";

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
            profileData.profile.name,
          );
        }

        const response = await instance.put(
          "/messages/edit_user",
          formDataObject,
        );

        if (response.status != 200) {
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
