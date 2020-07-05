"use strict";

var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    shortid = require("shortid"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  stream_key: String
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateStreamKey = function () {
  return shortid.generate();
};

module.exports = UserSchema;