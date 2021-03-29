import PropTypes from "prop-types";
import React from "react";

import ResponsesView from "./ResponsesView";
import { responseType } from "./ResponsesPropTypes";

const ResponsesContainer = ({ isFetching, responses }) => {
  return (
    <>
      {isFetching ? (
        <h3 className="fullWidthText">Fetching...</h3>
      ) : (
        <ResponsesView responses={responses} />
      )}
    </>
  );
};

ResponsesContainer.propTypes = {
  isFetching: PropTypes.bool,
  responses: PropTypes.arrayOf(responseType),
};

export default ResponsesContainer;
