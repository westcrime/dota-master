import axiosInstance from "@shared/api/client";

const profileApi = {
  get: async () => {
    return await axiosInstance.get(`profile/records`);
  },
}

export default profileApi