import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { getTracks } from "../../utils/tracksStorage";

const SearchForm = ({ setRawText, rawText, disabled }) => {
  const handleTracksChange = (event) => {
    const text = event.target.value;
    setRawText(text);
  };

  useEffect(() => {
    if (disabled) return;

    const text = getTracks();
    setRawText(text);
  }, [setRawText, disabled]);

  return (
    <>
      <h3 className="major fullWidthText">Enter track list</h3>
      <textarea
        className="searchBox"
        placeholder='Enter you playlist items in "artist - title" format'
        onChange={handleTracksChange}
        value={rawText}
        disabled={disabled}
      />
    </>
  );
};

SearchForm.propTypes = {
  setRawText: PropTypes.func,
  rawText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SearchForm;
