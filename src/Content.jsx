import React from "react";
import SpotifySongSearch from "./SpotifySongSearch";

const Content = () => {
  return (
    <section id="wrapper">
      <header>
        <div className="inner">
          <h2>Playlist Generator for Spotify</h2>
          <p>
            Service to generate spotify playlists from user inputs and external
            data providers.
          </p>
        </div>
      </header>
      <div className="wrapper">
        <div className="inner">
          <SpotifySongSearch />
        </div>
      </div>
    </section>
  );
};

export default Content;
