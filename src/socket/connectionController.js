import { actions } from "./connectionActions";

export const handleSocketConnections = (io) => {
  io.on("connection", (socket) => {
    let addedUser = false;

    socket.on("subscribe", ({ room, username }) => {
      if (addedUser) return;
      addedUser = true;

      actions.subscribe({ room, username, socket });
    });

    socket.on("send message", ({ room, message }) => {
      actions.sendMessage({ room, message, socket });
    });

    socket.on("typing", (room) => {
      actions.setTyping({ room, socket });
    });

    socket.on("stop typing", (room) => {
      actions.setStoppedTyping({ room, socket });
    });

    socket.on("disconnect", (room) => {
      if (addedUser) {
        actions.disconnect({ room, socket });
      }
    });
  });
};
