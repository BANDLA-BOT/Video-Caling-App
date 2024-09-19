"use strict";

var io = require("./../server").io;

module.exports = function (socket) {
  try {
    console.log("Connected");
    socket.on("code", function (data, callback) {
      socket.broadcast.emit("code", data);
    });
  } catch (ex) {
    console.log(ex.message);
  }
};
//# sourceMappingURL=socketManager.dev.js.map
