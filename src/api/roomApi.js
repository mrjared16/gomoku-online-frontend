import axiosClient from "api/axiosClient";

const roomApi = {
  getListRoom: () => {
    const url = "/rooms";

    return axiosClient.get(url);
  },
  getRoom: (id) => {
    const url = `/rooms/${id}`;

    return axiosClient.get(url);
  },
  createRoom: (hostId) => {
    const url = "/rooms";
    const body = {
      hostId,
    };

    return axiosClient.post(url, body);
  },
};

export default roomApi;
