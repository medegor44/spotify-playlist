import React from "react";
import Login from "../userSection/Login";

const Header = () => {
  return (
    <header id="header">
      <h1>
        <a href="../..">spotify playlist</a>
      </h1>
      <nav>
        <Login />
      </nav>
    </header>
  );
};

export default Header;
