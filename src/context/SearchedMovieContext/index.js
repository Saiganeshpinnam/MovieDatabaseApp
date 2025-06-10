import React from 'react'

const SearchedMovieContext = React.createContext({
  userInputSearch: '',
  updateSearchedMovie: () => {},
})

export default SearchedMovieContext