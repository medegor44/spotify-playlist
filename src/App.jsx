import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SpotifyLogin } from "./SpotifyLogin";
import { SpotifyAuthRedirect } from "./SpotifyAuthRedirect";
import { SpotifyPlaylists } from "./SpotifyPlaylists";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <SpotifyAuthRedirect />
        </Route>
        <Route path="/">
          <SpotifyLogin />
          <SpotifyPlaylists />
        </Route>
      </Switch>
    </Router>
  );
};
