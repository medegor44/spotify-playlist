import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "./contexts/UserContext";

import UnauthorizedError from "./utils/UnauthorizedError";
import { addTracksToPlaylist, createPlaylist } from "./utils/spotify";

import "./css/CreatePlaylistButton.css";

const CreatePlaylistButton = ({ tracksUris }) => {
  const [playlistName, setName] = useState("");
  const { userData, authorized, setAuthorizationError } = useContext(
    UserContext
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleButtonClick = async () => {
    const data = await createPlaylist(
      userData.token,
      userData.id,
      playlistName
    );

    const playlistId = data.id;

    try {
      await addTracksToPlaylist(userData.token, playlistId, tracksUris);
      setSuccess(`${playlistName} created`);
    } catch (e) {
      if (e instanceof UnauthorizedError) setAuthorizationError(e);
      else setError(e.message);
    }
  };

  return (
    <>
      <div className="sectionContentContainer createPlaylist">
        <h3 className="major fullWidthText">Generate playlist</h3>

        <input
          type="text"
          className="playlistName"
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={!authorized}
        />
        <button
          className="playlistButton button primary"
          type="button"
          onClick={handleButtonClick}
          disabled={!authorized}
        >
          Create playlist
        </button>
        <Message error={error} success={success} />
      </div>
    </>
  );
};

CreatePlaylistButton.propTypes = {
  tracksUris: PropTypes.arrayOf(PropTypes.string),
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

export default CreatePlaylistButton;
