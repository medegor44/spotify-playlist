import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { setToken } from "./utils/tokenStorage";

const getAccessTokenFromLocationHash = (locationHash) => {
  const parsed = queryString.parse(locationHash);
  return parsed["access_token"];
};

export const SpotifyAuthRedirect = () => {
  const [redirect, setRedirect] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const token = getAccessTokenFromLocationHash(window.location.hash);

    setToken(token);

    setRedirect(true);
  }, []);

  if (redirect) history.push("/");
  return <h1>Authenticating</h1>;
};
