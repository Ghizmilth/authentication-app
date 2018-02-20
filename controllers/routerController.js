var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  return res.sendFile(path.join(__dirname + "/views/index.html"));
});

router.post("/", function(req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
});
