import {Link} from 'react-router-dom'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'

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
    pageNumber: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=${pageNumber}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
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
        popularMoviesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickingPrevBtn = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
        }),
        this.getPopularMovies,
      )
    } else {
      this.setState(
        {
          pageNumber: 1,
        },
        this.getPopularMovies,
      )
    }
  }

  onClickingNxtBtn = () => {
    const {pageNumber} = this.state
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }),
      this.getPopularMovies,
    )
  }

  onClickingPageButton = pageNumber => {
    this.setState(
      {
        pageNumber,
      },
      this.getPopularMovies,
    )
  }

  renderPopularMovies = () => {
    const {popularMoviesData, pageNumber} = this.state

    return (
      <div className="home-bg-container">
        <Header />
        <ul className="popular-movies-container">
          {popularMoviesData.map(eachPopularMovie => (
            <li key={eachPopularMovie.id} className="each-popular-movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachPopularMovie.posterPath}`}
                alt={eachPopularMovie.title}
                className="movie-poster-image"
              />
              <div className="title-rating-btn-container">
                <div className="title-rating-container">
                  <p className="movie-title">{eachPopularMovie.title}</p>
                  <p className="movie-rating">{eachPopularMovie.voteAverage}</p>
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
          <button
            type="button"
            className="pagination-btn"
            onClick={this.onClickingPrevBtn}
          >
            Prev
          </button>
          <p className="page-number">{pageNumber}</p>

          <button
            type="button"
            className="pagination-btn"
            onClick={this.onClickingNxtBtn}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  renderFailureView = () => <h1>Not Found</h1>

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMovies()
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
