import {Switch, Route} from 'react-router-dom'

import {Component} from 'react'

import Home from './components/Home'

import TopRatedMovies from './components/TopRatedMovies'

import UpcomingMovies from './components/UpcomingMovies'

import SingleMovieDetails from './components/SingleMovieDetails'

import SearchedMovies from './components/SearchedMovies'

import SearchedMovieContext from './context/SearchedMovieContext'

import Pagination from './components/Pagination'

import './App.css'

// write your code here

class App extends Component {
  state = {
    userInputSearch: '',
    pageNumber: 1,
  }

  updateSearchedMovie = userInput => {
    this.setState({
      userInputSearch: userInput,
    })
  }

  renderPrevPage = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(prevState => ({
        pageNumber: prevState.pageNumber - 1,
      }))
    } else {
      this.setState({
        pageNumber: 1,
      })
    }
  }

  renderNextPage = () => {
    const {pageNumber} = this.state
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }))
  }

  render() {
    const {userInputSearch, pageNumber} = this.state

    return (
      <div className="home-bg-container">
        <SearchedMovieContext.Provider
          value={{
            userInputSearch,
            updateSearchedMovie: this.updateSearchedMovie,
            pageNumber,
            renderPrevPage: this.renderPrevPage,
            renderNextPage: this.renderNextPage,
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/top-rated" component={TopRatedMovies} />
            <Route exact path="/upcoming" component={UpcomingMovies} />
            <Route exact path="/movie/:id" component={SingleMovieDetails} />
            <Route exact path="/searched-movies" component={SearchedMovies} />
          </Switch>
          <Pagination />
        </SearchedMovieContext.Provider>
      </div>
    )
  }
}

export default App
