import axiosClient from "api/axiosClient";

const gameHistoryApi = {
  getListGameHistory: () => {
    const url = "/gameHistory";

    return axiosClient.get(url);
  },
  getGameHistory: (id) => {
    const url = `/gameHistory/${id}`;

    return axiosClient.get(url);
  },
};

export default gameHistoryApi;
