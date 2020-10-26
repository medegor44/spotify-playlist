import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SpotifyUsername } from "./SpotifyUsername";
import { SpotifyLoginButton } from "./SpotifyLoginButton";
import { getToken, setToken } from "./utils/tokenStorage";
import queryString from "query-string";

const getAccessTokenFromLocationHash = (locationHash) => {
  const parsed = queryString.parse(locationHash);
  return parsed["/access_token"];
};

export const SpotifyLogin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!getToken()) {
      const token = getAccessTokenFromLocationHash(window.location.hash);

      if (!token) return;

      setToken(token);
      history.push("/");
    }

    setAuthenticated(true);
  }, [history]);

  if (authenticated) return <SpotifyUsername />;

  return <SpotifyLoginButton />;
};
