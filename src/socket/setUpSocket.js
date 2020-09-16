import socket from "socket.io";

export const setUpSocket = (server) => {
  return socket(server);
};