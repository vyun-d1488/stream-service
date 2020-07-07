"use strict";

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _connectEnsureLogin = _interopRequireDefault(require("connect-ensure-login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _connectEnsureLogin["default"].ensureLoggedOut(), function (req, res) {
  res.render("login", {
    user: null,
    errors: {
      email: req.flash("email"),
      password: req.flash("password")
    }
  });
});
router.post("/", _passport["default"].authenticate("localLogin", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));
module.exports = router;