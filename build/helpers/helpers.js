"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _child_process = _interopRequireDefault(require("child_process"));

var _default2 = _interopRequireDefault(require("../config/default"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var spawn = _child_process["default"].spawn;
var cmd = _default2["default"].rtmp_server.trans.ffmpeg;

var generateStreamThumbnail = function generateStreamThumbnail(stream_key) {
  var args = ["-y", "-i", "http://127.0.0.1:8888/live/" + stream_key + "/index.m3u8", "-ss", "00:00:01", "-vframes", "1", "-vf", "scale=-2:300", _path["default"].join(process.cwd() + "/public/thumbnails/" + stream_key + ".png")];
  spawn(cmd, args, {
    detached: true,
    stdio: "ignore"
  }).unref();
};

var _default = {
  generateStreamThumbnail: generateStreamThumbnail
};
exports["default"] = _default;