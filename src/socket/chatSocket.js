import socketIOClient from "socket.io-client";
const chatSocket = socketIOClient(
  `${process.env.REACT_APP_SOCKET_URL}/chat`,
  {
    transports: ['websocket'],
    upgrade: false
  }
);

export { chatSocket };