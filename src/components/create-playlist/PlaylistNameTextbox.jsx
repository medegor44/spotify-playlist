import React from "react";
import PropTypes from "prop-types";

const PlaylistNameTextbox = ({ disabled, name, setName }) => {
  return (
    <input
      type="text"
      className="playlistName"
      placeholder="Enter playlist name"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
      }}
      disabled={disabled}
    />
  );
};

PlaylistNameTextbox.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  setName: PropTypes.func,
};

export default PlaylistNameTextbox;
