import axiosClient from "api/axiosClient";

const userApi = {
  fetch: () => {
    const url = "/auth/verify";
		return axiosClient.get(url);
  },
  login: (username, password) => {
		const url = "/auth/login";
    const body = {
      username,
      password,
    };

		return axiosClient.post(url, body);
  },
  register: (firstName, lastName, username, email, password) => {
    const url = "/auth/register";
    const body = {
			name: firstName + " " + lastName,
      username,
      email,
      password,
    };

		return axiosClient.post(url, body);
	},
	loginWithGoogle: (token) => {
    const url = "/auth/oauth/google";
    const body = {
      idToken: token,
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
