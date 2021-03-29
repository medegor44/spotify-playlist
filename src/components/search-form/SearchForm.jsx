import React, { useContext } from "react";
import PropTypes from "prop-types";

import useToken from "../../hooks/useToken";
import UserContext from "../../contexts/UserContext";

const SearchForm = ({ handleTracksChange, rawText, handleClick }) => {
  const [token] = useToken();
  const { userData } = useContext(UserContext);
  return (
    <section className="wrapper spotlight style3 ">
      <div className="inner">
        <section className="sectionContentContainer">
          <h3 className="major fullWidthText">Enter track list</h3>
          <textarea
            className="searchBox"
            placeholder='Enter you playlist items in "artist - title" format'
            onChange={handleTracksChange}
            value={rawText}
            disabled={!token || !userData}
          />
          <button
            className="searchButton button primary"
            type="button"
            onClick={handleClick}
            disabled={!token || !userData}
          >
            Search
          </button>
        </section>
      </div>
    </section>
  );
};

SearchForm.propTypes = {
  handleTracksChange: PropTypes.func,
  rawText: PropTypes.string,
  handleClick: PropTypes.func,
};

export default SearchForm;
