import React, { Fragment, useState } from 'react';
import MetaData from '../layout/MetaData';
import './search.css'

import { useNavigate } from 'react-router-dom';

const Search = () => {

  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()


  const searchSubmitHandler = (e) => {
    e.preventDefault()
    navigate(`/products/${keyword}`)
  }

  return (
    <Fragment>
      <MetaData title='Search' />
      <form className="searchBox" onSubmit={(e) => searchSubmitHandler(e)}>
        <input
          type="text"
          placeholder='Search A Product...'
          onChange={(e) => setKeyword(e.target.value)} />
      </form>
    </Fragment>
  );
}

export default Search;