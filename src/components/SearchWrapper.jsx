import React, { useState } from "react";
import PropTypes from "prop-types";

import ResponsesContainer from "./search-results/ResponsesContainer";
import CreatePlaylistForm from "./create-playlist/CreatePlaylistForm";
import SearchFormContainer from "./search-form/SearchFormContainer";

import "../css/SpotifySongSearch.css";

const SearchWrapper = ({ disabled }) => {
  const [responses, setResponses] = useState([]);
  const [rawText, setRawText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  return (
    <>
      <SearchFormContainer
        setResponses={setResponses}
        setIsFetching={setIsFetching}
        rawText={rawText}
        setRawText={setRawText}
        disabled={disabled}
      />
      <ResponsesContainer isFetching={isFetching} responses={responses} />
      <CreatePlaylistForm responses={responses} disabled={disabled} />
    </>
  );
};

SearchWrapper.propTypes = {
  disabled: PropTypes.bool,
};

export default SearchWrapper;
