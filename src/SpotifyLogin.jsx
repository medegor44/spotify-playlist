import React, { useContext } from "react";

import UserContext from "./contexts/UserContext";
import SpotifyUsername from "./SpotifyUsername";
import SpotifyLoginButton from "./SpotifyLoginButton";

const SpotifyLogin = () => {
  const { userData, authorized } = useContext(UserContext);

  if (userData && authorized) return <SpotifyUsername />;

  return <SpotifyLoginButton />;
};

export default SpotifyLogin;
