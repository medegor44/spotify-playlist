import React, { useState } from "react";
import PropTypes from "prop-types";

import ResponsesContainer from "./search-results/ResponsesContainer";
import CreatePlaylistForm from "./create-playlist/CreatePlaylistForm";
import SearchForm from "./search-form/SearchForm";

const MainContent = ({ disabled }) => {
  const [responses, setResponses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <>
      <section className="wrapper spotlight style3 ">
        <div className="inner">
          <section className="sectionContentContainer">
            <SearchForm
              setResponses={setResponses}
              setIsFetching={setIsFetching}
              disabled={disabled}
            />
          </section>
        </div>
      </section>
      <div className="wrapper alt spotlight style2">
        <div className="inner">
          <div className="sectionContentContainer">
            <ResponsesContainer isFetching={isFetching} responses={responses} />
          </div>
        </div>
      </div>
      <div className="wrapper spotlight style3">
        <div className="inner">
          <div className="sectionContentContainer">
            <CreatePlaylistForm responses={responses} disabled={disabled} />
          </div>
        </div>
      </div>
    </>
  );
};

MainContent.propTypes = {
  disabled: PropTypes.bool,
};

export default MainContent;
