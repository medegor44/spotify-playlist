import React from "react";
import { generateAuthUrl } from "./utils/spotify";

const SpotifyLoginButton = () => {
  const initiateSpotifyLogin = () => {
    const url = window.location.href.split("?")[0];
    window.location.href = generateAuthUrl(url);
  };

  return (
    <button
      className="button primary"
      type="button"
      onClick={initiateSpotifyLogin}
    >
      Log in to spotify
    </button>
  );
};

export default SpotifyLoginButton;
