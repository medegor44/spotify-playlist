import React from "react";
import { generateAuthUrl } from "./utils/spotify";

export const SpotifyLoginButton = () => {
  const initiateSpotifyLogin = () => {
    const url = window.location.href.split("?")[0];
    window.location.href = generateAuthUrl(`${url}auth`);
  };

  return <button onClick={initiateSpotifyLogin}>Log in to spotify</button>;
};
