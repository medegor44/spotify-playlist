import PropTypes from "prop-types";
import React from "react";

const trackType = PropTypes.shape({
  trackId: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
});

const errorType = PropTypes.shape({
  message: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
});

const responsesType = PropTypes.oneOfType([trackType, errorType]);

const TrackView = ({ track }) => {
  return <li>{track.trackId}</li>;
};

TrackView.propTypes = {
  track: trackType,
};

TrackView.defaultProps = {
  track: null,
};

const ErrorView = ({ error }) => {
  return <li>There was an error: {error.message}</li>;
};

ErrorView.propTypes = {
  error: errorType,
};

ErrorView.defaultProps = {
  error: null,
};

const ResponsesView = ({ responses }) => {
  const views = responses.map((response) => {
    if (!response.hasError)
      return <TrackView track={response} key={response.id} />;
    return <ErrorView error={response} key={response.id} />;
  });

  return <ul>{views}</ul>;
};

ResponsesView.propTypes = {
  responses: PropTypes.arrayOf(responsesType),
};

ResponsesView.defaultProps = {
  responses: [],
};

export default ResponsesView;
