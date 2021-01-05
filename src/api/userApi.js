import axiosClient from "api/axiosClient";

const userApi = {
  fetch: () => {
    const url = "/auth/verify";
		return axiosClient.get(url);
  },
};

export default userApi;
