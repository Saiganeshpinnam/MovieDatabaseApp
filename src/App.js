import {Switch, Route} from 'react-router-dom'

import {Component} from 'react'

import Home from './components/Home'

import TopRatedMovies from './components/TopRatedMovies'

import UpcomingMovies from './components/UpcomingMovies'

import SingleMovieDetails from './components/SingleMovieDetails'

import SearchedMovies from './components/SearchedMovies'

import SearchedMovieContext from './context/SearchedMovieContext'

import './App.css'

// write your code here

class App extends Component {
  state = {
    userInputSearch: '',
  }

  updateSearchedMovie = userInput => {
    this.setState({
      userInputSearch: userInput,
    })
  }

  render() {
    const {userInputSearch} = this.state
    return (
      <SearchedMovieContext.Provider
        value={{
          userInputSearch,
          updateSearchedMovie: this.updateSearchedMovie,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={SingleMovieDetails} />
          <Route exact path="/searched-movies" component={SearchedMovies} />
        </Switch>
      </SearchedMovieContext.Provider>
    )
  }
}

export default App