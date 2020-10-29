import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { SpotifyLogin } from "./SpotifyLogin";
import { SpotifyPlaylists } from "./SpotifyPlaylists";
import { SpotifySongSearch } from "./SpotifySongSearch";
import { getToken, setToken } from "./utils/tokenStorage";
import { getAccessTokenFromLocationHash } from "./utils/spotify";

export const App = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      const token = getAccessTokenFromLocationHash(window.location.hash);

      if (!token) return;

      setToken(token);
    }

    setAuthorized(true);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <SpotifyLogin authorized={authorized} />
          <SpotifySongSearch authorized={authorized} />
          <SpotifyPlaylists />
        </Route>
      </Switch>
    </Router>
  );
};
