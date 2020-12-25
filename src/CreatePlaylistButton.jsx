import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "./contexts/UserContext";
import { addTracksToPlaylist, createPlaylist } from "./utils/spotify";
import "./css/CreatePlaylistButton.css";

const CreatePlaylistButton = ({ tracksUris }) => {
  const [playlistName, setName] = useState("");
  const userData = useContext(UserContext);
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
      setError(`There was an error: ${e.message}`);
    }
  };

  return (
    <>
      <h3 className="major">Generate playlist</h3>
      <div className="sectionContentContainer createplaylist">
        <input
          type="text"
          className="playlistname"
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className="playlistbutton"
          type="button"
          onClick={handleButtonClick}
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

CreatePlaylistButton.defaultProps = {
  tracksUris: [],
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

Message.defaultProps = {
  error: "",
  success: "",
};

export default CreatePlaylistButton;
