import React from "react";
import PropTypes from "prop-types";

import "../../css/SearchForm.css";

const TrackInput = ({ setRawText, rawText, disabled }) => {
  const handleTracksChange = (event) => {
    const text = event.target.value;
    setRawText(text);
  };

  return (
    <>
      <h3 className="major fullWidthText">Enter track list</h3>
      <textarea
        className="trackInput"
        placeholder='Enter you playlist items in "artist - title" format'
        onChange={handleTracksChange}
        value={rawText}
        disabled={disabled}
      />
    </>
  );
};

TrackInput.propTypes = {
  setRawText: PropTypes.func,
  rawText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TrackInput;
