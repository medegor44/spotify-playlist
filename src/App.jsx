import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyPlaylists from "./SpotifyPlaylists";
import SpotifySongSearch from "./SpotifySongSearch";
import { getToken, setToken } from "./utils/tokenStorage";
import { getAccessTokenFromLocationHash, fetchUser } from "./utils/spotify";
import "./css/App.css";
import UserContext from "./contexts/UserContext";

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      if (!getToken()) {
        const token = getAccessTokenFromLocationHash(window.location.hash);
        if (!token) return;
        setToken(token);
      }

      const token = getToken();
      setAuthorized(true);

      const user = await fetchUser(`${token}`);

      if (user.hasError) {
        setAuthorized(false);
        return;
      }
      setUserData({ token, ...user });
    };

    authorize();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <UserContext.Provider value={userData}>
            <div className="container">
              <div className="headContainer">
                <h1>Spotify playlist generator</h1>
                <SpotifyLogin authorized={authorized} />
              </div>
              <SpotifySongSearch authorized={authorized} />
              <SpotifyPlaylists />
            </div>
          </UserContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
