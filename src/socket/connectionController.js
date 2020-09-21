import { actions } from "./connectionActions";

export const handleSocketConnections = (io) => {
  // State to keep control of the timers that are active
  let timersRunning = {};

  // Functionst to change timer state
  const addTimerRunning = (data) => {
    timersRunning = { ...timersRunning, ...data };
  };

  const deleteTimer = (room) => {
    delete timersRunning[room];
  };

  io.on("connection", (socket) => {
    let addedUser = false;

    socket.on("subscribe", ({ room, username, time }) => {
      if (addedUser) return;
      addedUser = true;

      actions.subscribe({ room, username, socket });

      const roomData = io.sockets.adapter.rooms[room];
      const shouldStartCountdown =
        roomData.length === 2 && !timersRunning[String(room)];

      if (shouldStartCountdown) {
        actions.startCountdown({
          room,
          io,
          time,
          addTimerRunning,
          deleteTimer,
        });
      }
    });

    socket.on("send message", ({ message, id }) => {
      actions.sendMessage({ message, socket, id });
    });

    socket.on("typing", () => {
      actions.setTyping({ socket });
    });

    socket.on("stop typing", () => {
      actions.setStoppedTyping({ socket });
    });

    socket.on("disconnect", () => {
      if (addedUser) {
        actions.disconnect({ socket });
      }
    });
  });
};
