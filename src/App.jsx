import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { SpotifyLogin } from "./SpotifyLogin";
import { SpotifyPlaylists } from "./SpotifyPlaylists";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <SpotifyLogin />
          <SpotifyPlaylists />
        </Route>
      </Switch>
    </Router>
  );
};
