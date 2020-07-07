"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeMediaServer = _interopRequireDefault(require("node-media-server"));

var _default2 = _interopRequireDefault(require("./config/default"));

var _helpers = _interopRequireDefault(require("./helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = require("./database/index").User;

var rmtp_server = _default2["default"].rtmp_server;
var nms = new _nodeMediaServer["default"](rmtp_server);
nms.on("prePublish", function (id, StreamPath, args) {
  var stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log("[NodeEvent on prePublish]", "id=".concat(id, " StreamPath=").concat(StreamPath, " args=").concat(JSON.stringify(args)));
  User.findOne({
    stream_key: stream_key
  }, function (err, user) {
    if (!err) {
      if (!user) {
        var session = nms.getSession(id);
        session.reject();
      } else {
        _helpers["default"].generateStreamThumbnail(stream_key);
      }
    }
  });
});

var getStreamKeyFromStreamPath = function getStreamKeyFromStreamPath(path) {
  var parts = path.split("/");
  return parts[parts.length - 1];
};

var _default = nms;
exports["default"] = _default;