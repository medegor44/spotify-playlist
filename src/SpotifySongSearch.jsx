import React, { useContext, useEffect, useState } from "react";
import shortid from "shortid";

import { fetchTracks } from "./utils/spotify";
import { setTracks, getTracks } from "./utils/tracksStorage";

import parseArtistsTracks from "./utils/parser";
import ResponsesView from "./ResponsesView";
import CreatePlaylistButton from "./CreatePlaylistButton";
import UserContext from "./contexts/UserContext";

import "./css/SpotifySongSearch.css";

const SpotifySongSearch = () => {
  const [responses, setResponses] = useState([]);
  const [rawText, setRawText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { userData, authorized } = useContext(UserContext);

  const handleTracksChange = (event) => {
    const text = event.target.value;
    setRawText(text);
  };

  const performRequest = async (artistsTracksText, token) => {
    const tracks = parseArtistsTracks(artistsTracksText);
    setIsFetching(true);

    const trackResponses = (await fetchTracks(token, tracks)).map(
      (response, idx) => {
        return { ...response, id: `${shortid.generate()} ${idx}` };
      }
    );

    setIsFetching(false);
    setResponses(trackResponses);
  };

  const handleClick = () => {
    setTracks(rawText);
    performRequest(rawText, userData.token);
  };

  useEffect(() => {
    if (!userData || !authorized) return;

    const text = getTracks();
    setRawText(text);
    performRequest(text, userData.token);
  }, [authorized, userData]);

  if (!authorized) return <h1>Waiting for authorization</h1>;

  return (
    <>
      <section>
        <h3 className="major">Enter track list</h3>
        <div className="sectionContentContainer">
          <textarea
            className="searchBox"
            placeholder='Enter you playlist items in "artist - title" format'
            onChange={handleTracksChange}
            value={rawText}
          />
          <button
            className="searchButton button primary"
            type="button"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </section>
      <section>
        {isFetching ? (
          <p>Fetching...</p>
        ) : (
          <ResponsesView responses={responses} />
        )}
      </section>
      <section>
        <CreatePlaylistButton
          tracksUris={responses
            .filter((response) => !response.hasError)
            .map((track) => track.trackUri)}
        />
      </section>
    </>
  );
};

export default SpotifySongSearch;
