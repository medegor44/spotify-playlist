import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Modal from "./Modal";
import UserContext from "./contexts/UserContext";
import useAuthorization from "./hooks/useAuthorization";

import "../assets/css/main.css";
import "./css/App.css";

const App = () => {
  const {
    userData,
    authorized,
    authorizationError,
    handleError,
    setAuthorizationError,
  } = useAuthorization();

  if (authorizationError) handleError();

  return (
    <div id="page-wrapper">
      <Router>
        <Switch>
          <Route path="/">
            <UserContext.Provider
              value={{ userData, authorized, setAuthorizationError }}
            >
              <Header />
              <Content />
              <Footer />
              <Modal show={authorizationError} />
            </UserContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
