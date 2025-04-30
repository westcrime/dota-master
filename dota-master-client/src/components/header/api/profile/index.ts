import axiosInstance from "@shared/api/client";

const profileApi = {
  get: async () => {
    return await axiosInstance.get(`auth/current-user`);
  },
}

export default profileApi