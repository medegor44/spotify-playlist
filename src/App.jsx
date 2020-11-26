import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyPlaylists from "./SpotifyPlaylists";
import SpotifySongSearch from "./SpotifySongSearch";
import "./css/App.css";
import UserContext from "./contexts/UserContext";
import useAuthorization from "./hooks/useAuthorization";

const App = () => {
  const { userData, authorized } = useAuthorization();

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
