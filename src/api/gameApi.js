import axiosClient from "api/axiosClient";

const gameApi = {
  getGame: (roomID) => {
    const url = `/game/room/${roomID}`;

    return axiosClient.get(url);
  },
};

export default gameApi;
