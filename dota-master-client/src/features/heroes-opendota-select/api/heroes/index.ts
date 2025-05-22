import axiosInstance from "@shared/api/client";

const heroesApi = {
  get: async () => {
    return await axiosInstance.get(`heroes/opendota`);
  },
};

export default heroesApi;
