import React, { useContext, useEffect, useState, useCallback } from "react";
import shortid from "shortid";

import { fetchTracks } from "./utils/spotify";
import { setTracks, getTracks } from "./utils/tracksStorage";
import parseArtistsTracks from "./utils/parser";
import UserContext from "./contexts/UserContext";
import SearchForm from "./SearchForm";
import ResponsesContainer from "./ResponsesContainer";
import CreatePlaylistForm from "./CreatePlaylistForm";

import "./css/SpotifySongSearch.css";

const SpotifySongSearch = () => {
  const [responses, setResponses] = useState([]);
  const [rawText, setRawText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { userData, authorized, setAuthorizationError } = useContext(
    UserContext
  );

  const handleTracksChange = (event) => {
    const text = event.target.value;
    setRawText(text);
  };

  const performRequest = useCallback(
    async (artistsTracksText, token) => {
      const tracks = parseArtistsTracks(artistsTracksText);
      setIsFetching(true);

      try {
        const trackResponses = (await fetchTracks(token, tracks)).map(
          (response, idx) => {
            return { ...response, id: `${shortid.generate()} ${idx}` };
          }
        );

        setIsFetching(false);
        setResponses(trackResponses);
      } catch (e) {
        setAuthorizationError(e);
      }
    },
    [setAuthorizationError]
  );

  const handleClick = () => {
    setTracks(rawText);
    performRequest(rawText, userData.token);
  };

  useEffect(() => {
    if (!userData || !authorized) return;

    const text = getTracks();
    setRawText(text);
    performRequest(text, userData.token);
  }, [authorized, userData, performRequest]);

  return (
    <>
      <SearchForm
        handleClick={handleClick}
        handleTracksChange={handleTracksChange}
        rawText={rawText}
      />
      <ResponsesContainer isFetching={isFetching} responses={responses} />
      <CreatePlaylistForm responses={responses} />
    </>
  );
};

export default SpotifySongSearch;
