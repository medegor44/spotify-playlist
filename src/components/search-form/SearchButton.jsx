import React, { useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import parseArtistsTracks from "../../utils/parser";
import { fetchTracks } from "../../spotify-client";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { getTracks, setTracks } from "../../utils/tracksStorage";
import useToken from "../../hooks/useToken";
import UserContext from "../../contexts/UserContext";

const SearchButton = ({ disabled, setIsFetching, setResponses, rawText }) => {
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

  const handleClick = () => {
    setTracks(rawText);
    performRequest(rawText, token);
  };

  useEffect(() => {
    if (disabled) return;

    const text = getTracks();
    performRequest(text, token);
  }, [disabled, performRequest, token]);

  return (
    <button
      className="searchButton button primary"
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      Search
    </button>
  );
};

SearchButton.propTypes = {
  setIsFetching: PropTypes.func,
  setResponses: PropTypes.func,
  rawText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SearchButton;
