import axiosClient from "api/axiosClient";

const userApi = {
  login: (username, password) => {
    const url = "";
    const body = {
      username,
      password,
    };

    return axiosClient.post(url, body);
  },
  register: (firstName, lastName, username, email, password) => {
    const url = "";
    const body = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    return axiosClient.post(url, body);
	},
	loginWithGoogle: (token) => {
    const url = "";
    const body = {
      token,
    };
    return axiosClient.post(url, body);
	},
	loginWithFacebook: (token) => {
    const url = "";
    const body = {
      token,
    };
    return axiosClient.post(url, body);
  },
};

export default userApi;
