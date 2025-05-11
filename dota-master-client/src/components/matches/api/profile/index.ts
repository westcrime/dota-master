import axiosInstance from "@shared/api/client";

const profileApi = {
  get: async (limit?: number, offset?: number) => {
    return await axiosInstance.get(
      `profile/matches?limit=${limit}&offset=${offset}`,{ params: {
        limit: limit ?? import.meta.env.VITE_MATCHES_LIMIT_SIZE,
        offset: offset ?? 0
      }}
    );
  },
};

export default profileApi;
