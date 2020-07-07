"use strict";

var _express = _interopRequireDefault(require("express"));

var _connectEnsureLogin = _interopRequireDefault(require("connect-ensure-login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = require("../database/index").User;

var router = _express["default"].Router();

router.get("/info", _connectEnsureLogin["default"].ensureLoggedIn(), function (req, res) {
  if (req.query.streams) {
    var streams = JSON.parse(req.query.streams);
    var query = {
      $or: []
    };

    for (var stream in streams) {
      if (!streams.hasOwnProperty(stream)) continue;
      query.$or.push({
        stream_key: stream
      });
    }

    User.find(query, function (err, users) {
      if (err) return;

      if (users) {
        res.json(users);
      }
    });
  }
});
module.exports = router;