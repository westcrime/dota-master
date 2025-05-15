import axiosInstance from "@shared/api/client";

const matchesApi = {
  get: async (matchId: number) => {
    return await axiosInstance.get(`matches`, { params: { matchId } });
  },
};

export default matchesApi;
