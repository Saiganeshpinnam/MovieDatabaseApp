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

class TopRatedMovies extends Component {
  static contextType = SearchedMovieContext

  state = {
    topRatedMoviesData: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {pageNumber} = this.context
    this.getTopRatedMovies(pageNumber)
  }

  componentDidUpdate(prevProps, prevState) {
    const {pageNumber} = this.context
    if (this.prevPageNumber !== pageNumber) {
      this.getTopRatedMovies(pageNumber)
    }
    this.prevPageNumber = pageNumber
  }

  getTopRatedMovies = async pageNumber => {
    const {apiStatus} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=${pageNumber}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      //  console.log(data)
      //  data.results.map(eachResult => console.log(eachResult.title))
      const formattedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
        releaseDate: eachMovie.release_date,
        voteAverage: eachMovie.vote_average,
      }))
      this.setState({
        topRatedMoviesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickingPrevBtn = () => {
    const {topRatedMoviesPageNumber} = this.state
    if (topRatedMoviesPageNumber > 1) {
      this.setState(
        prevState => ({
          topRatedMoviesPageNumber: prevState.topRatedMoviesPageNumber - 1,
        }),
        this.getTopRatedMovies,
      )
    } else {
      this.setState(
        {
          topRatedMoviesPageNumber: 1,
        },
        this.getTopRatedMovies,
      )
    }
  }

  onClickingNxtBtn = () => {
    this.setState(
      prevState => ({
        topRatedMoviesPageNumber: prevState.topRatedMoviesPageNumber + 1,
      }),
      this.getTopRatedMovies,
    )
  }

  topRatesMovies = () => {
    const {topRatedMoviesData, topRatedMoviesPageNumber} = this.state
    // console.log(topRatedMoviesData)
    return (
      <div className="top-rated-bg-container">
        <Header />
        <ul className="top-rated-movies-container">
          {topRatedMoviesData.map(eachTopRatedMovie => (
            <li
              key={eachTopRatedMovie.id}
              className="each-top-rated-movie-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${eachTopRatedMovie.posterPath}`}
                alt={eachTopRatedMovie.title}
                className="movie-poster-image"
              />
              <div className="title-rating-container">
                <p className="movie-title">{eachTopRatedMovie.title}</p>
                <p className="movie-rating">{eachTopRatedMovie.voteAverage}</p>
              </div>
              <Link
                to={`/movie/${eachTopRatedMovie.id}`}
                className="view-details-btn-container"
              >
                <button type="button" className="view-details-btn">
                  View Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  renderFailureView = () => <NotFound />

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.topRatesMovies()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderSwitch()}</>
  }
}

export default TopRatedMovies
