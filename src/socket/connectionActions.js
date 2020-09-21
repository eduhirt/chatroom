import { removeEmail } from "../utils/stringReplacer";

export const actions = {
  subscribe({ room, username, socket }) {
    socket.username = username;
    socket.room = room;
    socket.join(room);

    socket.emit("login");

    socket.broadcast.to(socket.room).emit("user joined", {
      username: socket.username,
    });
  },

  sendMessage({ message, socket, id }) {
    const formattedMessage = removeEmail(message);

    socket.broadcast.to(socket.room).emit("room message", {
      id,
      message: formattedMessage,
      username: socket.username,
    });
  },

  setTyping({ socket }) {
    socket.broadcast.to(socket.room).emit("typing", {
      username: socket.username,
    });
  },

  setStoppedTyping({ socket }) {
    socket.broadcast.to(socket.room).emit("stop typing", {
      username: socket.username,
    });
  },

  disconnect({ socket }) {
    socket.broadcast.to(socket.room).emit("user left", {
      username: socket.username,
    });
  },

  startCountdown({ io, room, time, addTimerRunning, deleteTimer }) {
    let timeLeft = parseInt(time);

    const interval = setInterval(() => {
      io.sockets.in(room).emit("one second", {
        timeLeft,
      });

      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(interval);

        deleteTimer(room);

        io.sockets.in(room).emit("end connection");
      }
    }, 1000);

    addTimerRunning({ [room]: true });
  },
};
