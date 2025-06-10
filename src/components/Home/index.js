import {Link} from 'react-router-dom'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import Pagination from '../Pagination'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    popularMoviesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async pageNumber => {
    console.log(pageNumber)
    const {apiStatus} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=${pageNumber}`,
    )
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
        releaseDate: eachMovie.release_date,
        voteAverage: eachMovie.vote_average,
      }))
      this.setState({
        popularMoviesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomeMovieDetails = () => {
    const {popularMoviesData} = this.state
    return (
      <SearchedMovieContext.Consumer>
        {value => {
          const {renderPrevPage, renderNextPage, pageNumber} = value

          const getPopularMoviesData = this.getPopularMovies(pageNumber)

          return (
            <div className="home-bg-container">
              <Header />
              <ul className="popular-movies-container">
                {popularMoviesData.map(eachPopularMovie => (
                  <li
                    key={eachPopularMovie.id}
                    className="each-popular-movie-item"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${eachPopularMovie.posterPath}`}
                      alt={eachPopularMovie.title}
                      className="movie-poster-image"
                    />
                    <div className="title-rating-btn-container">
                      <div className="title-rating-container">
                        <p className="movie-title">{eachPopularMovie.title}</p>
                        <p className="movie-rating">
                          {eachPopularMovie.voteAverage}
                        </p>
                      </div>
                      <Link
                        to={`/movie/${eachPopularMovie.id}`}
                        className="view-details-btn-container"
                      >
                        <button type="button" className="view-details-btn">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pagination-container">
                <Pagination />
              </div>
            </div>
          )
        }}
      </SearchedMovieContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  renderFailureView = () => (
    <>
      <Header />
      <h1>Not Found</h1>
    </>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeMovieDetails()
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

export default Home
