export const actions = {
  subscribe({ room, username, socket }) {
    socket.username = username;
    socket.join(room);

    socket.emit("login");

    socket.broadcast.to(room).emit("user joined", {
      username: socket.username
    });
  },

  sendMessage({ room, message, socket }) {
    socket.broadcast.to(room).emit("room message", {
      message,
      username: socket.username,
    });
  },

  setTyping({ room, socket }) {
    socket.broadcast.to(room).emit("typing", {
      username: socket.username,
    });
  },

  setStoppedTyping({ room, socket }) {
    socket.broadcast.to(room).emit("stop typing", {
      username: socket.username,
    });
  },

  disconnect({ room, socket }) {
    socket.broadcast.to(room).emit("user left", {
      username: socket.username
    });
  },
};
