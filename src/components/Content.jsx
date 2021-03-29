import React from "react";
import PropTypes from "prop-types";

import SearchWrapper from "./SearchWrapper";

const Content = ({ disabled }) => {
  return (
    <>
      <section id="banner">
        <div className="inner">
          <h2>Playlist Generator for Spotify</h2>
          <p>
            Service to generate spotify playlists from user inputs and external
            data providers.
          </p>
        </div>
      </section>
      <section id="wrapper">
        <SearchWrapper disabled={disabled} />
      </section>
    </>
  );
};

Content.propTypes = {
  disabled: PropTypes.bool,
};

export default Content;
