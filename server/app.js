import express from "express";
import Session from "express-session";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import path from "path";
import middleware from "connect-ensure-login";
import { FileStore } from "session-file-store";
import flash from "connect-flash";
import cookieParser from "cookie-parser";

const app = express();

console.clear();

mongoose.connect(
      "mongodb+srv://gokutok:111111ab@cluster0-pu7z4.azure.mongodb.net/mangaDB?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("public"));
app.use(flash());
app.use(cookieParser());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json({ extended: true }));
