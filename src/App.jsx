import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import SpotifyLogin from "./SpotifyLogin";
import SpotifyPlaylists from "./SpotifyPlaylists";
import SpotifySongSearch from "./SpotifySongSearch";
import UserContext from "./contexts/UserContext";
import useAuthorization from "./hooks/useAuthorization";

import "../assets/css/main.css";
import "./css/App.css";

const Header = ({ authorized }) => {
  return (
    <header id="header">
      <h1>
        <a href="/">spotify playlist</a>
      </h1>
      <nav>
        <SpotifyLogin authorized={authorized} />
      </nav>
    </header>
  );
};

const AppContent = ({ authorized }) => {
  return (
    <section id="wrapper">
      <header>
        <div className="inner">
          <h2>Playlist Generator for Spotify</h2>
          <p>
            Service to generate spotify playlists from user inputs and external
            data providers.
          </p>
        </div>
      </header>
      <div className="wrapper">
        <div className="inner">
          <SpotifySongSearch authorized={authorized} />
        </div>
      </div>
    </section>
  );
};

const AppFooter = () => {
  return (
    <section id="footer">
      <div className="inner">
        <ul className="copyright">
          <li>&copy; Untitled Inc. All rights reserved.</li>
          <li>
            Design: <a href="http://html5up.net">HTML5 UP</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

const App = () => {
  const { userData, authorized } = useAuthorization();

  return (
    <div id="page-wrapper">
      <Router>
        <Switch>
          <Route path="/">
            <UserContext.Provider value={userData}>
              <Header authorized={authorized} />
              <AppContent authorized={authorized} />
              <AppFooter />
            </UserContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
