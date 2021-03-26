import PropTypes from "prop-types";
import React from "react";

import { fromS } from "hh-mm-ss";
import { responseType, trackType, errorType } from "./ResponsesPropTypes";

import "../../../css/TrackView.css";

const TrackView = ({ track, idx }) => {
  const durationInSec = Math.floor(track.duration / 1000);
  const artists = track.artists.join(", ");

  return (
    <div className="trackContainer">
      <h1 className="trackPosition">{idx + 1}</h1>
      <img className="albumCover" src={track.albumCover} alt="" />
      <div className="trackDataContainer">
        {artists}
        <br />
        {track.name}
      </div>
      <div className="trackDataContainer albumName">{track.album}</div>
      <div className="trackDataContainer">{fromS(durationInSec, "mm:ss")}</div>
    </div>
  );
};

TrackView.propTypes = {
  track: trackType,
  idx: PropTypes.number,
};

const ErrorView = ({ error, idx }) => {
  return (
    <div className="trackContainer errorIndicator">
      <h1 className="trackPosition">{idx + 1}</h1>
      There was an error: {error.message}
    </div>
  );
};

ErrorView.propTypes = {
  error: errorType,
  idx: PropTypes.number,
};

const ResponsesView = ({ responses }) => {
  const views = responses.map((response, idx) => {
    if (!response.hasError)
      return <TrackView track={response} idx={idx} key={response.id} />;
    return <ErrorView error={response} idx={idx} key={response.id} />;
  });

  return (
    <>
      <h3 className="major fullWidthText">Resolved Spotify tracks</h3>
      <div className="responseContainer">{views}</div>
    </>
  );
};

ResponsesView.propTypes = {
  responses: PropTypes.arrayOf(responseType),
};

export default ResponsesView;
