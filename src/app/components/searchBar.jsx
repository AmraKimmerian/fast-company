import React, { useEffect } from 'react'

const SearchBar = ({ word, handleSearchChange }) => {
  const onChange = ({ target }) => {
    handleSearchChange(target.value)
  }
  const clear = () => {
    handleSearchChange('')
  }

  return (
    <div className="m-1 w-100">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search..."
          onChange={onChange}
          value={word}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={clear}
        >
          <i className="bi bi-x" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
