import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import TrackInput from "./TrackInput";
import { getTracks, setTracks } from "../../utils/tracksStorage";
import parseArtistsTracks from "../../utils/parser";
import { fetchTracks } from "../../spotify-client";
import UnauthorizedError from "../../errors/UnauthorizedError";
import useToken from "../../hooks/useToken";
import UserContext from "../../contexts/UserContext";

import "../../css/SearchForm.css";

const SearchForm = ({ disabled, setIsFetching, setResponses }) => {
  const [rawText, setRawText] = useState("");
  const [token] = useToken();
  const { onError } = useContext(UserContext);

  const performRequest = useCallback(
    async (artistsTracksText, authToken) => {
      const tracks = parseArtistsTracks(artistsTracksText);
      setIsFetching(true);

      try {
        const trackResponses = (await fetchTracks(authToken, tracks)).map(
          (response, idx) => {
            return { ...response, id: `${shortid.generate()} ${idx}` };
          }
        );

        setIsFetching(false);
        setResponses(trackResponses);
      } catch (e) {
        if (e instanceof UnauthorizedError) onError();
      }
    },
    [onError, setIsFetching, setResponses]
  );

  const onButtonClick = () => {
    setTracks(rawText);
    performRequest(rawText, token);
  };

  useEffect(() => {
    if (disabled) return;

    const text = getTracks();
    setRawText(text);

    performRequest(text, token);
  }, [disabled, performRequest, token]);

  return (
    <>
      <TrackInput
        setRawText={setRawText}
        rawText={rawText}
        disabled={disabled}
      />
      <button
        className="searchButton button primary"
        type="button"
        onClick={onButtonClick}
        disabled={disabled}
      >
        Search
      </button>
    </>
  );
};

SearchForm.propTypes = {
  disabled: PropTypes.bool,
  setIsFetching: PropTypes.func,
  setResponses: PropTypes.func,
};

export default SearchForm;
