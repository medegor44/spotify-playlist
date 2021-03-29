import React from "react";
import PropTypes from "prop-types";

import SearchForm from "./SearchForm";
import SearchButton from "./SearchButton";

const SearchFormContainer = ({
  setRawText,
  rawText,
  disabled,
  setIsFetching,
  setResponses,
}) => {
  return (
    <>
      <section className="wrapper spotlight style3 ">
        <div className="inner">
          <section className="sectionContentContainer">
            <SearchForm
              setRawText={setRawText}
              rawText={rawText}
              disabled={disabled}
            />
            <SearchButton
              disabled={disabled}
              rawText={rawText}
              setIsFetching={setIsFetching}
              setResponses={setResponses}
            />
          </section>
        </div>
      </section>
    </>
  );
};

SearchFormContainer.propTypes = {
  setRawText: PropTypes.func,
  rawText: PropTypes.string,
  disabled: PropTypes.bool,
  setIsFetching: PropTypes.func,
  setResponses: PropTypes.func,
};

export default SearchFormContainer;
