"use strict";

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _connectEnsureLogin = _interopRequireDefault(require("connect-ensure-login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _connectEnsureLogin["default"].ensureLoggedOut(), function (req, res) {
  res.render("register", {
    user: null,
    errors: {
      username: req.flash("username"),
      email: req.flash("email")
    }
  });
});
router.post("/", _connectEnsureLogin["default"].ensureLoggedOut(), _passport["default"].authenticate("localRegister", {
  successRedirect: "/",
  failureRedirect: "/register",
  failureFlash: true
}));
module.exports = router;