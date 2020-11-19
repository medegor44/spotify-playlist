import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "./contexts/UserContext";
import { addTracksToPlaylist, createPlaylist } from "./utils/spotify";

const CreatePlaylistButton = ({ tracksUris }) => {
  const [playlistName, setName] = useState("");
  const userData = useContext(UserContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleButtonClick = async () => {
    const data = await createPlaylist(
      userData.token,
      userData.id,
      playlistName
    );

    const playlistId = data.id;

    try {
      await addTracksToPlaylist(userData.token, playlistId, tracksUris);
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    }
  };

  let message = null;
  if (success) message = <p>{playlistName} created</p>;
  if (error) message = <p>There was an error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button type="button" onClick={handleButtonClick}>
        Create playlist
      </button>
      {message}
    </div>
  );
};

CreatePlaylistButton.propTypes = {
  tracksUris: PropTypes.arrayOf(PropTypes.string),
};

CreatePlaylistButton.defaultProps = {
  tracksUris: [],
};

export default CreatePlaylistButton;
