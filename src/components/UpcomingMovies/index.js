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

class UpcomingMovies extends Component {
  state = {
    upcomingMoviesData: [],
    pageNumber: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {pageNumber} = this.context
    this.getUpcomingMovies(pageNumber)
  }

  getUpcomingMovies = async () => {
    const {pageNumber} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=${pageNumber}`,
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
        upcomingMoviesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickingUpcomingPrevBtn = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
        }),
        this.getUpcomingMovies,
      )
    } else {
      this.setState(
        {
          pageNumber: 1,
        },
        this.getUpcomingMovies,
      )
    }
  }

  onClickingUpcomingNxtBtn = () => {
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }),
      this.getUpcomingMovies,
    )
  }

  upcomingMovies = () => {
    const {upcomingMoviesData} = this.state
    return (
      <ul className="upcoming-movies-container">
        {upcomingMoviesData.map(eachUpcomingMovie => (
          <li key={eachUpcomingMovie.id} className="each-upcoming-movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${eachUpcomingMovie.posterPath}`}
              alt={eachUpcomingMovie.title}
              className="movie-poster-image"
            />
            <div className="title-rating-container">
              <p className="movie-title">{eachUpcomingMovie.title}</p>
              <p className="movie-rating">{eachUpcomingMovie.voteAverage}</p>
            </div>
            <Link
              to={`/movie/${eachUpcomingMovie.id}`}
              className="view-details-btn-container"
            >
              <button type="button" className="view-details-btn">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
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
        return this.upcomingMovies()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {pageNumber} = this.state
    return (
      <div className="upcoming-bg-container">
        <Header />
        {this.renderSwitch()}{' '}
        <div className="pagination-container">
          <>
            <button
              type="button"
              className="pagination-btn"
              onClick={this.onClickingUpcomingPrevBtn}
            >
              Prev
            </button>
            <p className="page-number">{pageNumber}</p>
            <button
              type="button"
              className="pagination-btn"
              onClick={this.onClickingUpcomingNxtBtn}
            >
              Next
            </button>
          </>
        </div>
      </div>
    )
  }
}

export default UpcomingMovies
