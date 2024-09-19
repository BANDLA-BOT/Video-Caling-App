"use strict";

var _require = require("./model"),
    saveCallId = _require.saveCallId,
    getCallId = _require.getCallId;

exports.saveCallId = function _callee(req, res) {
  var _req$body, id, signalData;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, id = _req$body.id, signalData = _req$body.signalData;
          _context.next = 4;
          return regeneratorRuntime.awrap(saveCallId(id, signalData));

        case 4:
          res.status(200).send(true);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getCallId = function _callee2(req, res) {
  var id, code;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getCallId(id));

        case 4:
          code = _context2.sent;
          res.status(200).send({
            code: code
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0.message);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
//# sourceMappingURL=controllers.dev.js.map
