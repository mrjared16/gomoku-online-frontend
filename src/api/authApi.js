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
  register: (firstName, lastName, username, email, password) => {
    const url = "/auth/register";
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
	forgotPassword: (email) => {
		const url = "/auth/forgotPassword";
    const body = {
      email,
    };

		return axiosClient.post(url, body);
	},
	getResetPassword: (token) => {
    const url = `/auth/resetPassword/${token}`;

		return axiosClient.get(url);
	},
	postResetPassword: (token, newPassword, confirmNewPassword) => {
		const url = "/auth/resetPassword";
    const body = {
			token,
			newPassword,
			confirmNewPassword,
    };

		return axiosClient.post(url, body);
	},
	activateUser: (token) => {
		const url = `/auth/activate`;
		const body = {
			token,
		}

		return axiosClient.post(url, body);
	},
};

export default authApi;
