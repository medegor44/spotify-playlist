import React from "react";
import { SpotifyUsername } from "./SpotifyUsername";
import { SpotifyLoginButton } from "./SpotifyLoginButton";

export const SpotifyLogin = ({ authorized }) => {
  if (authorized) return <SpotifyUsername />;

  return <SpotifyLoginButton />;
};
