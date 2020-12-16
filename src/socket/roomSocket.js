import socketIOClient from "socket.io-client";
const roomSocket = socketIOClient(
  `${process.env.REACT_APP_SOCKET_URL}/room`,
  {
    transports: ['websocket'],
    upgrade: false
  }
);

export { roomSocket };