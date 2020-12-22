import socketIOClient from "socket.io-client";
const gameSocket = socketIOClient(
  `${process.env.REACT_APP_SOCKET_URL}/game`,
  {
    transports: ['websocket'],
    upgrade: false
  }
);

export { gameSocket };