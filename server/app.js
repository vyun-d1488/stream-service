import express from "express";
import Session from "express-session";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import path from "path";
import middleware from "connect-ensure-login";
import SessionFileStore from "session-file-store";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import config from "./config/default";
import "dotenv/config";

const app = express();
const FileStore = SessionFileStore(Session);
const PORT = process.env.PORT;

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

app.use(
      Session({
            store: new FileStore({
                  path: "./server/sessions",
            }),
            secret: config.server.secret,
            maxAge: Date.now() + (60 + 1000 + 30),
            resave: true,
            saveUninitialized: true,
      })
);

app.get("*", middleware.ensureLoggedIn(), (req, res) => {
      res.render("index");
});

app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
});
