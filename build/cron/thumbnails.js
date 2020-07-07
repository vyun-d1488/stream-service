"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cron = _interopRequireDefault(require("cron"));

var _request = _interopRequireDefault(require("request"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

var _default2 = _interopRequireDefault(require("../config/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var CronJob = _cron["default"].CronJob;
var port = _default2["default"].rtmp_server.http.port;
var job = new CronJob("*/5 * * * * *", function () {
  _request["default"].get("http://127.0.0.1:" + port + "/api/streams", function (error, response, body) {
    var streams = JSON.parse(body);

    if (_typeof(streams["live"] !== undefined)) {
      var live_streams = streams["live"];

      for (var stream in live_streams) {
        if (!live_streams.hasOwnProperty(stream)) continue;

        _helpers["default"].generateStreamThumbnail(stream);
      }
    }
  });
}, null, true);
var _default = job;
exports["default"] = _default;