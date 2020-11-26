import PropTypes from "prop-types";
import React from "react";
import { fromS } from "hh-mm-ss";
import "./css/TrackView.css";

const trackType = PropTypes.shape({
  trackUri: PropTypes.string,
  artist: PropTypes.string,
  name: PropTypes.string,
  album: PropTypes.string,
  albumCover: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
  duration: PropTypes.number,
});

const errorType = PropTypes.shape({
  message: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
});

const responsesType = PropTypes.oneOfType([trackType, errorType]);

const TrackView = ({ track, idx }) => {
  const durationInSec = Math.floor(track.duration / 1000);
  return (
    <div className="trackContainer">
      <h1 className="trackPosition">{idx + 1}</h1>
      <img className="albumCover" src={track.albumCover} alt="" />
      <div className="trackDataContainer">
        <p>{track.artist}</p>
        <p>{track.name}</p>
      </div>
      <p className="trackDataContainer">{track.album}</p>
      <p className="trackDataContainer">{fromS(durationInSec, "mm:ss")}</p>
    </div>
  );
};

TrackView.propTypes = {
  track: trackType,
  idx: PropTypes.number,
};

TrackView.defaultProps = {
  track: null,
  idx: -1,
};

const ErrorView = ({ error, idx }) => {
  return (
    <div className="trackContainer errorIndicator" color="red">
      <h1 className="trackPosition">{idx + 1}</h1>
      <p>There was an error: {error.message}</p>
    </div>
  );
};

ErrorView.propTypes = {
  error: errorType,
  idx: PropTypes.number,
};

ErrorView.defaultProps = {
  error: null,
  idx: -1,
};

const ResponsesView = ({ responses }) => {
  const views = responses.map((response, idx) => {
    if (!response.hasError)
      return <TrackView track={response} idx={idx} key={response.id} />;
    return <ErrorView error={response} idx={idx} key={response.id} />;
  });

  return <div className="responseContainer">{views}</div>;
};

ResponsesView.propTypes = {
  responses: PropTypes.arrayOf(responsesType),
};

ResponsesView.defaultProps = {
  responses: [],
};

export default ResponsesView;
