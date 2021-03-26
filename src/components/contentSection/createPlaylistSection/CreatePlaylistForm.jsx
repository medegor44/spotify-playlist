import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../css/CreatePlaylistButton.css";
import PlaylistNameTextbox from "./PlaylistNameTextbox";
import CreationButton from "./CreationButton";
import { responseType } from "../searchResultsSection/ResponsesPropTypes";

const CreatePlaylistForm = ({ responses, disabled }) => {
  const [playlistName, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const uris = responses
    .filter((response) => !response.hasError)
    .map((track) => track.trackUri);

  return (
    <div className="wrapper spotlight style3">
      <div className="inner">
        <div className="sectionContentContainer createPlaylist">
          <h3 className="major fullWidthText">Generate playlist</h3>

          <PlaylistNameTextbox
            disabled={disabled}
            name={playlistName}
            setName={setName}
          />
          <CreationButton
            tracksUris={uris}
            playlistName={playlistName}
            setError={setError}
            setSuccess={setSuccess}
            disabled={disabled}
          />
          <Message error={error} success={success} />
        </div>
      </div>
    </div>
  );
};

CreatePlaylistForm.propTypes = {
  responses: PropTypes.arrayOf(responseType),
  disabled: PropTypes.bool,
};

const Message = ({ error, success }) => {
  if (success) return <p>{success}</p>;
  if (error) return <p>{error}</p>;
  return null;
};

Message.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
};

export default CreatePlaylistForm;
