var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  return res.sendFile(path.join(__dirname + "/views/index.html"));
});

router.post("/", function(req, res, next) {
  if (req.body.password !== req.body.passConfirmation) {
    var err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passConfirmation
  ) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passConfirmation: req.body.passConfirmation
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/profile");
      }
    });
  } else if (rea.body.logemail && rea.body.logpassword) {
    User.authenticate(req.body.logemail, req.body, logpassword, function(
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong email or password and try again.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("All fields are requiered.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
