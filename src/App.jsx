import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import UserContext from "./contexts/UserContext";
import useAuthorization from "./hooks/useAuthorization";

import "../assets/css/main.css";
import "./css/App.css";

const App = () => {
  const { userData, authorized } = useAuthorization();

  console.log(userData);
  return (
    <div id="page-wrapper">
      <Router>
        <Switch>
          <Route path="/">
            <UserContext.Provider value={{ userData, authorized }}>
              <Header />
              <Content />
              <Footer />
            </UserContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
