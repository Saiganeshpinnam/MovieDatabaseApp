import {Link, withRouter} from 'react-router-dom'

import {Component} from 'react'

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
            <div className='header-container'>
              <Link to='/' className='logo-title-link'>
                <h1 className='movieDb-title'>movieDB</h1>
              </Link>
              <div className='search-container'>
                <input
                  type='text'
                  className='input-element'
                  placeholder='Enter the Movie Name..'
                  onChange={this.onChangingMovieName}
                  value={searchInput}
                />

                <button
                  type='button'
                  onClick={() => this.onClickingSearchIcon(updateSearchedMovie)}
                  className='search-btn'
                >
                  Search
                </button>
              </div>
              <div className='categories-container'>
                <Link to='/' className='category-link'>
                  <h1 className='category-heading'>Popular</h1>
                </Link>
                <Link to='/top-rated' className='category-link'>
                  <h1 className='category-heading'>Top Rated</h1>
                </Link>
                <Link to='/upcoming' className='category-link'>
                  <h1 className='category-heading'>Upcoming</h1>
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
