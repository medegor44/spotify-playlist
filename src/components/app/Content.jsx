import React from "react";
import SearchManager from "../contentSection/SearchManager";

const Content = () => {
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
        <SearchManager />
      </section>
    </>
  );
};

export default Content;
