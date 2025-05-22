import axiosInstance from "@shared/api/client";

const profileApi = {
  get: async (limit?: number, offset?: number, heroId?: number) => {
    return await axiosInstance.get(`profile/matches`, {
      params: {
        limit: limit ?? import.meta.env.VITE_MATCHES_LIMIT_SIZE,
        offset: offset,
        heroId,
      },
    });
  },
};

export default profileApi;
