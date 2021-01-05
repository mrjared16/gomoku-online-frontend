import axiosClient from "api/axiosClient";

const leaderBoardApi = {
  getListLeaderBoard: () => {
    const url = "/user/leaderboard";

    return axiosClient.get(url);
  },
};

export default leaderBoardApi;
