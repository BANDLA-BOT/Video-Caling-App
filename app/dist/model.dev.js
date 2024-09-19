"use strict";

var redisClient = require("./config/redis");

exports.saveCallId = function (key, value) {
  return new Promise(function (resolve, reject) {
    redisClient.SET(key, JSON.stringify(value), "EX", 86400, function (err, res) {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
};

exports.getCallId = function (key) {
  return new Promise(function (resolve, reject) {
    redisClient.GET(key, function (err, res) {
      if (err) {
        reject(err);
      }

      resolve(JSON.parse(res));
    });
  });
};
//# sourceMappingURL=model.dev.js.map
