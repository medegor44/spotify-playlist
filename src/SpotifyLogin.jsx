import React, { useState, useEffect } from "react";
import { SpotifyUsername } from "./SpotifyUsername";
import { SpotifyLoginButton } from "./SpotifyLoginButton";
import { getToken } from "./utils/tokenStorage";

export const SpotifyLogin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) setAuthenticated(true);
  });

  if (authenticated) return <SpotifyUsername />;
  return <SpotifyLoginButton />;
};
