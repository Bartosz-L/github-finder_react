import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClearBtn, clearUsers, setAlert }) => {
  const [text, setText] = useState('');

  const handleChangeInput = e => {
    setText(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please eneter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={handleChangeInput}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClearBtn && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired
};
export default Search;
