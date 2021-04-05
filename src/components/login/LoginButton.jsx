import React from "react";
import { generateAuthUrl } from "../../spotify-client";

const LoginButton = () => {
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

export default LoginButton;
