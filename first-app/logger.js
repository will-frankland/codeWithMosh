const EventEmitter = require("events");

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    // Send http req
    console.log(message);

    // Raise an event
    this.emit("messagedLogged", { id: 1, url: "http://" });
  }
}

module.exports = Logger;
