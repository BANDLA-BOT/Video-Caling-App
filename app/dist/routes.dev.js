"use strict";

var express = require("express");

var router = express.Router();

var controllers = require('./controllers.js');

router.post("/api/save-call-id", controllers.saveCallId);
router.get("/api/get-call-id/:id", controllers.getCallId);
module.exports = router;
//# sourceMappingURL=routes.dev.js.map
