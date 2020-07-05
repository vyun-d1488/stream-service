import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import shortid from "shortid";

const Schema = mongoose.Schema;

let user = new Schema({
      username: String,
      email: String,
      password: String,
      stream_key: String,
});
