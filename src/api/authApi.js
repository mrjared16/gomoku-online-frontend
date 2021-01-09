import axiosClient from "api/axiosClient";

const authApi = {
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
  register: (name, username, email, password) => {
    const url = "/auth/register";
    const body = {
			name,
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

export default authApi;
