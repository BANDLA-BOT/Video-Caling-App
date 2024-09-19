"use strict";

require("dotenv").config();

var express = require("express");

var http = require("http");

var bodyParser = require("body-parser");

var cors = require("cors");

var port = process.env.PORT;
var app = express();
var server = http.createServer(app);

var Routes = require("./app/routes");

var path = require('path');

app.use([cors(), bodyParser.json(), bodyParser.urlencoded({
  extended: false
}), Routes]);

var io = module.exports.io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

var socketManager = require("./app/socketManager");

io.on("connection", socketManager);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express["static"](path.join(__dirname, 'client/build'))); // Handle React routing, return all requests to React app

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=server.dev.js.map
