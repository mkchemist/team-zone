import React from "react";
import PropTypes from "prop-types";

function SearchBox({ placeholder, id, inputClass,autoSearch, onSearch, searchButtonText }) {
  let [keyword, setKeyword] = React.useState('');

  const startSearch = (e) => {
    onSearch(keyword)

  }

  const handleSearchInput = e => {
    setKeyword(e.target.value)

    if(autoSearch) {
      onSearch(e.target.value)
    }

    if(e.key === "Enter") {
      startSearch(keyword)
    }
  }


  return (
    <div className="form-inline">
      <input
        type="search"
        name={id}
        id={id}
        placeholder={placeholder}
        className={inputClass}
        value={keyword}
        onChange={handleSearchInput}
        onKeyPress={handleSearchInput}
      />
      {!autoSearch && <button className="btn btn-sm btn-primary" onClick={startSearch} >
          <span className="fa fa-search mr-1"></span>
          <span>{searchButtonText}</span>
        </button>}
    </div>
  );
}

SearchBox.defaultProps = {
  placeholder: "Search ...",
  id: "search_box",
  inputClass: 'form-control form-control-sm col mr-1',
  autoSearch: true,
  searchButtonText: 'Search'
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  autoSearch: PropTypes.bool,
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;
