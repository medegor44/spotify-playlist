import React, { useState } from "react";
import { getToken } from "./utils/tokenStorage";
import { fetchSpotifyTracksIds } from "./utils/spotify";
import { parseArtistsTracks } from "./utils/parser";

const TrackView = ({ track }) => {
  return <li>{track.trackId}</li>;
};

const ErrorView = ({ error }) => {
  return <li>There was an error: {error.message}</li>;
};

const ResponsesView = ({ responses }) => {
  const views = responses.map((response) => {
    if (!response.hasError)
      return <TrackView track={response} key={response.id} />;
    return <ErrorView error={response} key={response.id} />;
  });

  return <ul>{views}</ul>;
};

export const SpotifySongSearch = ({ authorized }) => {
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
      <button onClick={handleClick}>Search</button>
      {isFetching ? (
        <p>Fetching...</p>
      ) : (
        <ResponsesView responses={responses} />
      )}
    </div>
  );
};
