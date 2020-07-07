"use strict";

var _express = _interopRequireDefault(require("express"));

var _connectEnsureLogin = _interopRequireDefault(require("connect-ensure-login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = require("../database/index").User;

var router = _express["default"].Router();

router.get("/", _connectEnsureLogin["default"].ensureLoggedIn(), function (req, res) {
  if (req.query.username) {
    User.findOne({
      username: req.query.username
    }, function (err, user) {
      if (err) return;

      if (user) {
        res.json({
          stream_key: user.stream_key
        });
      }
    });
  } else {
    res.json({});
  }
});
module.exports = router;