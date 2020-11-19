import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchTracks } from "./utils/spotify";
import parseArtistsTracks from "./utils/parser";
import ResponsesView from "./ResponsesView";
import "./css/SpotifySongSearch.css";
import CreatePlaylistButton from "./CreatePlaylistButton";
import UserContext from "./contexts/UserContext";
import { setTracks, getTracks } from "./utils/tracksStorage";

const SpotifySongSearch = ({ authorized }) => {
  const [responses, setResponses] = useState([]);
  const [rawText, setRawText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const userData = useContext(UserContext);

  const handleTracksChange = (event) => {
    const text = event.target.value;
    setRawText(text);
  };

  const performRequest = async (artistsTracksText, token) => {
    const tracks = parseArtistsTracks(artistsTracksText);
    setIsFetching(true);

    const trackResponses = await fetchTracks(token, tracks);

    setIsFetching(false);
    setResponses(trackResponses);
  };

  const handleClick = () => {
    setTracks(rawText);
    performRequest(rawText, userData.token);
  };

  useEffect(() => {
    if (!authorized || !userData) return;

    const text = getTracks();
    setRawText(text);
    performRequest(text, userData.token);
  }, [authorized, userData]);

  if (!authorized) return <h1>Waiting for authorization</h1>;

  return (
    <div className="searchContainer">
      <p>Enter track list (in &quot;artist&quot; - &quot;title&quot; format)</p>
      <textarea
        className="searchBox"
        onChange={handleTracksChange}
        value={rawText}
      />
      <button className="searchButton" type="button" onClick={handleClick}>
        Search
      </button>
      {isFetching ? (
        <p>Fetching...</p>
      ) : (
        <ResponsesView responses={responses} />
      )}
      <CreatePlaylistButton
        tracksUris={responses
          .filter((response) => !response.hasError)
          .map((track) => track.trackUri)}
      />
    </div>
  );
};

SpotifySongSearch.propTypes = {
  authorized: PropTypes.bool,
};

SpotifySongSearch.defaultProps = {
  authorized: false,
};

export default SpotifySongSearch;
