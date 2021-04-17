import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import PlaylistNameTextbox from "./PlaylistNameTextbox";
import { responseType } from "../search-results/ResponsesPropTypes";
import { addTracksToPlaylist, createPlaylist } from "../../spotify-client";
import UnauthorizedError from "../../errors/UnauthorizedError";
import useToken from "../../hooks/useToken";
import UserContext from "../../contexts/UserContext";

import "../../css/CreatePlaylistForm.css";

const CreatePlaylistForm = ({ responses, disabled }) => {
  const [playlistName, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token] = useToken();
  const { userData, onError: onUnauthorizedError } = useContext(UserContext);

  const uris = responses
    .filter((response) => !response.hasError)
    .map((track) => track.trackUri);

  const onButtonClick = async () => {
    try {
      const data = await createPlaylist(token, userData.id, playlistName);
      const playlistId = data.id;

      await addTracksToPlaylist(token, playlistId, uris);

      setSuccess(`${playlistName} created`);
    } catch (e) {
      if (e instanceof UnauthorizedError) onUnauthorizedError();
      else setError(e.message);
    }
  };

  return (
    <>
      <h3 className="major fullWidthText">Generate playlist</h3>
      <PlaylistNameTextbox
        disabled={disabled}
        name={playlistName}
        setName={setName}
      />
      <button
        className="playlistButton button primary"
        type="button"
        onClick={onButtonClick}
        disabled={disabled}
      >
        Create playlist
      </button>
      <Message error={error} success={success} />
    </>
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
