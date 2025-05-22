import axiosInstance from "@shared/api/client";

const profileApi = {
  get: async () => {
    return await axiosInstance.get(`profile/basic-info`);
  },
}

export default profileApi