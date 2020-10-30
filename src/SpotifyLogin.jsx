import React from "react";
import PropTypes from "prop-types";
import SpotifyUsername from "./SpotifyUsername";
import SpotifyLoginButton from "./SpotifyLoginButton";

const SpotifyLogin = ({ authorized }) => {
  if (authorized) return <SpotifyUsername />;

  return <SpotifyLoginButton />;
};

SpotifyLogin.propTypes = {
  authorized: PropTypes.bool,
};

SpotifyLogin.defaultProps = {
  authorized: false,
};

export default SpotifyLogin;
