// Core Modules
import React from 'react';

// Third-Party Modules
import PropTypes from 'prop-types';

// Misc Files
import './index.css';

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}  
    />
    <button 
      type="submit"
    >{children}</button>
  </form>

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node.isRequired
}

export default Search;