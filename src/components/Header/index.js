import {Link, withRouter} from 'react-router-dom'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
  }

  onChangingMovieName = event => {
    this.setState({
      searchInput: event.target.value.toLowerCase(),
    })
  }

  onClickingSearchIcon = updateSearchedMovie => {
    const {searchInput} = this.state
    const {history} = this.props
    updateSearchedMovie(searchInput)
    history.push('/searched-movies')
  }

  render() {
    const {searchInput} = this.state
    return (
      <SearchedMovieContext.Consumer>
        {value => {
          const {userInputSearch, updateSearchedMovie} = value

          return (
            <div className="header-container">
              <Link to="/">
                <button type="button" className="movieDb-title">
                  movieDB
                </button>
              </Link>
              <div className="search-container">
                <input
                  type="search"
                  className="input-element"
                  placeholder="Enter the Movie Name.."
                  onChange={this.onChangingMovieName}
                  value={searchInput}
                />

                <BsSearch
                  className="search-icon"
                  onClick={() => this.onClickingSearchIcon(updateSearchedMovie)}
                />
              </div>
              <div className="categories-container">
                <Link to="/">
                  <button type="button" className="category-btn">
                    Popular Movies
                  </button>
                </Link>
                <Link to="/top-rated">
                  <button type="button" className="category-btn">
                    Top Rated Movies
                  </button>
                </Link>
                <Link to="/upcoming">
                  <button type="button" className="category-btn">
                    Upcoming Movies
                  </button>
                </Link>
              </div>
            </div>
          )
        }}
      </SearchedMovieContext.Consumer>
    )
  }
}

export default withRouter(Header)
