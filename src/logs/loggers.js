const log4js = require("log4js");

log4js.configure({
  appenders: {
    myLoggerConsole: { type: "console" },
    myLoggerError: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["myLoggerConsole"], level: "info" },
    consola: { appenders: ["myLoggerConsole"], level: "debug" },
    file: { appenders: ["myLoggerConsole"], level: "trace" },
    error: { appenders: ["myLoggerError", "myLoggerConsole"], level: "warn" },
  },
});

module.exports = log4js;
