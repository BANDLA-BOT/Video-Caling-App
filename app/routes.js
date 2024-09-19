const express = require("express");
const router = express.Router();
const controllers = require('./controllers.js')

router.post("/api/save-call-id", controllers.saveCallId);
router.get("/api/get-call-id/:id", controllers.getCallId);

module.exports = router;