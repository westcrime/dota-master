import axiosInstance from "@shared/api/client";

const profileApi = {
  get: async () => {
    return await axiosInstance.get(`profile/recent-hero-stats`);
  },
}

export default profileApi