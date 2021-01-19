import PropTypes from "prop-types";
import React from "react";

import CreatePlaylistButton from "./CreatePlaylistButton";
import { responseType } from "./ResponsesPropTypes";

const CreatePlaylistForm = ({ responses }) => {
  return (
    <div className="wrapper spotlight style3">
      <div className="inner">
        <CreatePlaylistButton
          tracksUris={responses
            .filter((response) => !response.hasError)
            .map((track) => track.trackUri)}
        />
      </div>
    </div>
  );
};

CreatePlaylistForm.propTypes = {
  responses: PropTypes.arrayOf(responseType),
};

export default CreatePlaylistForm;
