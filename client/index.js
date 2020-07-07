import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.render(
      <BrowserRouter>
            <Root />
      </BrowserRouter>,
      document.getElementById("root")
);
