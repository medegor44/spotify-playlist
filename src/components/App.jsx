import React, { useState, useCallback, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Modal from "./Modal";
import UserContext from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import useToken from "../hooks/useToken";

import "../../assets/css/main.css";
import "../css/App.css";
import { getAccessTokenFromLocationHash } from "../spotify-client/spotify";

const redirectToOrigin = () => {
  const currentUrl = window.location.href;
  window.location.href = currentUrl.slice(0, currentUrl.indexOf("#") + 2);
};

const App = () => {
  const [token, clearToken] = useToken();
  const [showModal, setShowModal] = useState(false);

  const onError = useCallback(() => {
    clearToken();
    setShowModal(true);
  }, [clearToken]);

  const userData = useUserData(token, onError);

  useEffect(() => {
    const tokenInUrl = getAccessTokenFromLocationHash(window.location.hash);
    if (tokenInUrl) redirectToOrigin();
  }, []);

  return (
    <div id="page-wrapper">
      <Router>
        <Switch>
          <Route path="/">
            <UserContext.Provider value={{ userData, onError }}>
              <Header />
              <Content />
              <Footer />
              <Modal show={showModal} />
            </UserContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
