import axiosClient from "api/axiosClient";

const boardApi = {
  move: (id, {x, y, value, idPlayer}) => {
		const url = `/boards/${id}`;
    const body = {
      x,
			y,
			value,
			idPlayer,
    };

		return axiosClient.post(url, body);
  },
};

export default boardApi;
