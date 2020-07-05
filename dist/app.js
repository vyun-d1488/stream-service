"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _connectEnsureLogin = _interopRequireDefault(require("connect-ensure-login"));

var _sessionFileStore = _interopRequireDefault(require("session-file-store"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _default = _interopRequireDefault(require("./config/default"));

require("dotenv/config");

var _passport = _interopRequireDefault(require("./auth/passport"));

var _mediaServer = _interopRequireDefault(require("./media-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mediaServer["default"].run();

var app = (0, _express["default"])();
var FileStore = (0, _sessionFileStore["default"])(_expressSession["default"]);
var PORT = process.env.PORT;
var CLUSTER = process.env.CLUSTER;

_mongoose["default"].connect(CLUSTER, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.set("views", _path["default"].join(__dirname, "./views"));
app.use(_express["default"]["static"]("public"));
app.use((0, _connectFlash["default"])());
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json({
  extended: true
}));
app.use((0, _expressSession["default"])({
  store: new FileStore({
    path: "./server/sessions"
  }),
  secret: _default["default"].server.secret,
  maxAge: Date.now() + (60 + 1000 + 30),
  resave: true,
  saveUninitialized: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.get("*", _connectEnsureLogin["default"].ensureLoggedIn(), function (req, res) {
  res.render("index");
});
app.listen(PORT, function () {
  console.log("App listening on ".concat(PORT));
});