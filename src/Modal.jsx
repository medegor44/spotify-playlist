import React from "react";
import PropTypes from "prop-types";

import SpotifyLoginButton from "./SpotifyLoginButton";
import UnauthorizedError from "./utils/UnauthorizedError";

import "./css/Modal.css";

const Modal = ({ show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h3>Your session was expired. Please login again</h3>
        <SpotifyLoginButton />
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.instanceOf(UnauthorizedError),
};

export default Modal;
