import React from "react";
import SpotifyLogin from "./SpotifyLogin";

const Header = () => {
  return (
    <header id="header">
      <h1>
        <a href="/">spotify playlist</a>
      </h1>
      <nav>
        <SpotifyLogin />
      </nav>
    </header>
  );
};

export default Header;
