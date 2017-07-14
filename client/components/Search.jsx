import React from 'react';

const Search = ({ onChange }) =>
  (
    <form className="col s6">
      <div className="input-field">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="search for document"
          onChange={onChange}
        />
        <label
          className="label-icon"
          htmlFor="search"
        ><i className="material-icons">search</i></label>
        <i className="material-icons">close</i>
      </div>
    </form>
  );
export default Search;
