"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeMediaServer = _interopRequireDefault(require("node-media-server"));

var _default2 = _interopRequireDefault(require("./config/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rmtp_server = _default2["default"].rtmp_server;
var nms = new _nodeMediaServer["default"](rmtp_server);
nms.on("prePublish", function (id, StreamPath, args) {
  var stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log("[NodeEvent on prePublish]", "id=".concat(id, " StreamPath=").concat(StreamPath, " args=").concat(JSON.stringify(args)));
});

var getStreamKeyFromStreamPath = function getStreamKeyFromStreamPath(path) {
  var parts = path.split("/");
  return parts[parts.length - 1];
};

var _default = nms;
exports["default"] = _default;