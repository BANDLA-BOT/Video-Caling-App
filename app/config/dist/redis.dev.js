"use strict";

var redis = require("redis");

var options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASSWORD
};
var client = redis.createClient(options);
client.on("error", function (error) {
  console.log(error);
});
module.exports = client;
//# sourceMappingURL=redis.dev.js.map
