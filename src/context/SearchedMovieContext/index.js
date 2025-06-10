import React from 'react'

const SearchedMovieContext = React.createContext({
  userInputSearch: '',
  updateSearchedMovie: () => {},
  pageNumber: 1,
  renderPrevPage: () => {},
  renderNextPage: () => {},
})

export default SearchedMovieContext
