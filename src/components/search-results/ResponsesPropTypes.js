import PropTypes from "prop-types";

const trackType = PropTypes.shape({
  trackUri: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  album: PropTypes.string,
  albumCover: PropTypes.string,
  hasError: PropTypes.bool,
  duration: PropTypes.number,
  id: PropTypes.string,
});

const errorType = PropTypes.shape({
  message: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
});

const responseType = PropTypes.oneOfType([trackType, errorType]);

export { responseType, trackType, errorType };
