import {Link} from 'react-router-dom'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import NotFound from '../NotFound'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchedMovies extends Component {
  static contextType = SearchedMovieContext

  state = {
    searchedMoviesData: [],
    apiStatus: apiStatusConstants.initial,
    pageNumber: 1,
  }

  componentDidMount() {
    const {userInputSearch} = this.context
    this.getSearchedMovies(userInputSearch)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const {userInputSearch} = this.context

  //   if (
  //     prevState.pageNumber !== this.state.pageNumber ||
  //     prevState.userInputSearch !== userInputSearch
  //   ) {
  //     this.getSearchedMovies(userInputSearch)
  //   }
  // }

 

  getSearchedMovies = async userInputSearch => {
    const {pageNumber} = this.state

    const searchedMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&query=${userInputSearch}&page=${pageNumber}`,
    )

    if (searchedMoviesResponse.ok === true) {
      const searchedMoviesResponseData = await searchedMoviesResponse.json()

      const formattedData = searchedMoviesResponseData.results.map(
        eachSearchedMovieData => ({
          id: eachSearchedMovieData.id,
          backdropPath: eachSearchedMovieData.backdrop_path,
          title: eachSearchedMovieData.title,
          posterPath: eachSearchedMovieData.poster_path,
          releaseDate: eachSearchedMovieData.release_date,
          voteAverage: eachSearchedMovieData.vote_average,
        }),
      )
      this.setState({
        searchedMoviesData: formattedData,

        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickingSearchMoviesPrevBtn = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
        }),
        this.getSearchedMovies,
      )
    } else {
      this.setState(
        {
          pageNumber: 1,
        },
        this.getSearchedMovies,
      )
    }
  }

  onClickingSearchMoviesNxtBtn = () => {
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }),
      this.getSearchedMovies,
    )
  }

  renderSearchedMovieDetails = () => {
    const {searchedMoviesData} = this.state
    return (
      <ul className='searched-movies-container'>
        {searchedMoviesData.map(eachSearchedMovie => (
          <li key={eachSearchedMovie.id} className='each-searched-movie-item'>
            <img
              src={`https://image.tmdb.org/t/p/w500${eachSearchedMovie.backdropPath}`}
              alt={eachSearchedMovie.title}
              className='movie-poster-image'
            />
            <div className='title-rating-btn-container'>
              <div className='title-rating-container'>
                <p className='movie-title'>{eachSearchedMovie.title}</p>
                <p className='movie-rating'>{eachSearchedMovie.voteAverage}</p>
              </div>
              <Link
                to={`/movie/${eachSearchedMovie.id}`}
                className='view-details-btn-container'
              >
                <button type='button' className='view-details-btn'>
                  View Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <Loader type='TailSpin' color='#00BFFF' height={50} width={50} />
  )

  renderSpecificDetailsFailureView = () => <NotFound />

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchedMovieDetails()
      case apiStatusConstants.failure:
        return this.renderSpecificDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {pageNumber} = this.state
    return (
      <div className='searched-movies-bg-container'>
        <Header />
        {this.renderSwitch()}
        <div className='pagination-container'>
          <>
            <button
              type='button'
              className='pagination-btn'
              onClick={this.onClickingSearchMoviesPrevBtn}
            >
              Prev
            </button>
            <p className='page-number'>{pageNumber}</p>
            <button
              type='button'
              className='pagination-btn'
              onClick={this.onClickingSearchMoviesNxtBtn}
            >
              Next
            </button>
          </>
        </div>
      </div>
    )
  }
}

export default SearchedMovies
