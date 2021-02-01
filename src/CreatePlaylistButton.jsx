import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "./contexts/UserContext";

import UnauthorizedError from "./utils/UnauthorizedError";
import { addTracksToPlaylist, createPlaylist } from "./utils/spotify";
import useToken from "./hooks/useToken";

import "./css/CreatePlaylistButton.css";

const CreatePlaylistButton = ({ tracksUris }) => {
  const [playlistName, setName] = useState("");
  const { userData, onError } = useContext(UserContext);
  const [token] = useToken();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleButtonClick = async () => {
    try {
      const data = await createPlaylist(token, userData.id, playlistName);
      const playlistId = data.id;

      await addTracksToPlaylist(token, playlistId, tracksUris);

      setSuccess(`${playlistName} created`);
    } catch (e) {
      if (e instanceof UnauthorizedError) onError();
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
          disabled={!token}
        />
        <button
          className="playlistButton button primary"
          type="button"
          onClick={handleButtonClick}
          disabled={!token}
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
