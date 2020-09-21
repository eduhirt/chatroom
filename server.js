import app from "./src";
import { createServer } from "http";
import { setUpSocket } from "./src/socket/setUpSocket";
import { handleSocketConnections } from "./src/socket/connectionController";

const port = process.env.PORT || 4000;

const server = createServer(app);

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

const io = setUpSocket(server);

handleSocketConnections(io);
