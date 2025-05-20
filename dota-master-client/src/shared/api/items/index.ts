import axiosInstance from "@shared/api/client";

const itemsApi = {
  get: async () => {
    return await axiosInstance.get(`items`);
  },
}

export default itemsApi