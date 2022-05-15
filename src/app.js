const { server, io } = require("./server/index");
const { environment } = require("./configuration/environment.js");
const log4js = require("./logs/loggers.js");

const PORT = environment.PORT;

let messages = [];

// Logs
const loggerConsole = log4js.getLogger("console");
const loggerError = log4js.getLogger("error");

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("render", "");

  socket.on("actualizacion", () => {
    io.sockets.emit("render", "");
  });
});

server.listen(PORT, () => {
  loggerConsole.info(`Server running on ${PORT}`);
  loggerConsole.info(`DEBUG: http://localhost:${PORT}`);
});
server.on("error", (error) => loggerError.error(`Error en servidor: ${error}`));
