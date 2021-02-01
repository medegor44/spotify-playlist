import React from "react";

import SpotifyUsername from "./SpotifyUsername";
import SpotifyLoginButton from "./SpotifyLoginButton";
import useToken from "./hooks/useToken";

const SpotifyLogin = () => {
  const [token] = useToken();

  if (token) return <SpotifyUsername />;

  return <SpotifyLoginButton />;
};

export default SpotifyLogin;
