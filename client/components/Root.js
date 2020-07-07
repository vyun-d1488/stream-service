import React, { Component } from "react";
import Streams from "./Streams";
import VideoPlayer from "./VideoPlayer";
import { Router, Route } from "react-router-dom";

const browserHistory = require("history").createBrowserHistory();

export default class Root extends Component {
      constructor(props) {
            super(props);
      }
      render() {
            return (
                  <Router history={browserHistory}>
                        <h1>Streams</h1>
                        <div>
                              <Route
                                    exact
                                    path="/"
                                    render={(props) => <Streams {...props} />}
                              />

                              <Route
                                    exact
                                    path="/stream/:username"
                                    render={(props) => (
                                          <VideoPlayer {...props} />
                                    )}
                              />
                        </div>
                        <a href="logout">logout</a>
                  </Router>
            );
      }
}
