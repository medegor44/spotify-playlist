import React, { useState } from "react";
import PropTypes from "prop-types";
import { getToken } from "./utils/tokenStorage";
import { fetchSpotifyTracksIds } from "./utils/spotify";
import parseArtistsTracks from "./utils/parser";
import ResponsesView from "./ResponsesView";

const SpotifySongSearch = ({ authorized }) => {
  const [responses, setResponses] = useState([]);
  const [rawText, setRawText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleTracksChange = (event) => {
    const text = event.target.value;
    setRawText(text);
  };

  const handleClick = async () => {
    const tracks = parseArtistsTracks(rawText);
    setIsFetching(true);

    const trackResponses = await fetchSpotifyTracksIds(getToken(), tracks);

    setIsFetching(false);
    setResponses(trackResponses);
  };

  if (!authorized) return <h1>Waiting for authorization</h1>;

  return (
    <div>
      <textarea onChange={handleTracksChange} value={rawText} />
      <button type="button" onClick={handleClick}>
        Search
      </button>
      {isFetching ? (
        <p>Fetching...</p>
      ) : (
        <ResponsesView responses={responses} />
      )}
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
