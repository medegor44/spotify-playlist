import React, { useContext } from "react";
import PropTypes from "prop-types";
import { addTracksToPlaylist, createPlaylist } from "../../../utils/spotify";
import UnauthorizedError from "../../../utils/UnauthorizedError";
import useToken from "../../../hooks/useToken";
import UserContext from "../../../contexts/UserContext";

const CreationButton = ({
  playlistName,
  tracksUris,
  setSuccess,
  setError,
  disabled,
}) => {
  const [token] = useToken();
  const { userData, onError: onUnauthorizedError } = useContext(UserContext);

  const handleButtonClick = async () => {
    try {
      const data = await createPlaylist(token, userData.id, playlistName);
      const playlistId = data.id;

      await addTracksToPlaylist(token, playlistId, tracksUris);

      setSuccess(`${playlistName} created`);
    } catch (e) {
      if (e instanceof UnauthorizedError) onUnauthorizedError();
      else setError(e.message);
    }
  };

  return (
    <>
      <button
        className="playlistButton button primary"
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
      >
        Create playlist
      </button>
    </>
  );
};

CreationButton.propTypes = {
  playlistName: PropTypes.string,
  tracksUris: PropTypes.arrayOf(PropTypes.string),
  setSuccess: PropTypes.func,
  setError: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CreationButton;
