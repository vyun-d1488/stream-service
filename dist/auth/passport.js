"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = require("../database/index").User;

var LocalStrategy = _passportLocal["default"].Strategy;

_passport["default"].serializeUser(function (user, cb) {
  cb(null, user);
});

_passport["default"].deserializeUser(function (obj, cb) {
  cb(null, obj);
});

_passport["default"].use("localRegister", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  User.findOne({
    $or: [{
      email: email
    }, {
      username: req.body.username
    }]
  }, function (err, user) {
    if (err) return done(err);

    if (user) {
      if (user.email === email) {
        req.flash("email", "email is already taken");
      }

      if (user.username === req.body.username) {
        req.flash("username", "username is already taken");
      }

      return done(null, false);
    } else {
      var _user = new User();

      _user.email = email;
      _user.password = _user.generateHash(password);
      _user.username = req.body.username;
      _user.stream_key = _shortid["default"].generate();

      _user.save(function (err) {
        if (err) throw err;
        return done(null, _user);
      });
    }
  });
}));

_passport["default"].use("localLogin", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, req.flash("email", "email doesn't exist."));
    if (!user.validPassword(password)) return done(null, false, req.flash("password", "wrong password."));
    return done(null, user);
  });
}));

var _default = _passport["default"];
exports["default"] = _default;