import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SingleMovieDetails extends Component {
  state = {
    movieDetailsSection: [],
    movieCastDetails: {},

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetailsSectionData()
    this.getMovieCastDetails()
  }

  getMovieDetailsSectionData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US`,
    )
    if (response.ok === true) {
      const data = await response.json()
      //  console.log(data)

      const updatedData = {
        id: data.id,
        releaseDate: data.release_date,
        genre: data.genres,
        ratings: data.vote_average,
        duration: data.runtime,
        name: data.title,
        image: data.poster_path,
        overview: data.overview,
      }
      this.setState({
        movieDetailsSection: updatedData,

        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getMovieCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieCastResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US`,
    )
    // console.log(movieCastResponse)
    if (movieCastResponse.ok === true) {
      const movieCastData = await movieCastResponse.json()
      //  console.log(movieCastData.cast, 'abcd')

      const updatedMovieCastData = {
        castId: movieCastData.id,
        movieCast: movieCastData.cast,
      }

      this.setState({
        movieCastDetails: updatedMovieCastData,

        apiStatus: apiStatusConstants.success,
      })
    }
    if (movieCastResponse.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSpecificMovieDetails = () => {
    const {movieDetailsSection, movieCastDetails} = this.state
    // console.log(movieDetailsSection)
    const {castId, movieCast} = movieCastDetails

    const {
      id,
      name,
      image,
      ratings,
      duration,
      releaseDate,
      overview,
      genre,
    } = movieDetailsSection
    //  console.log(genre)
    return (
      <>
        <Header />
        <div className="each-movie-description-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={name}
            className="specific-movie-image"
          />

          <div className="movie-text-description-container">
            <p className="specific-movie-title">{name}</p>
            <ul className="genres-value-container">
              {genre.map(eachMovieGenre => (
                <li key={eachMovieGenre.id}>
                  <p className="each-genre">{eachMovieGenre.name}</p>
                </li>
              ))}
            </ul>
            <p className="movie-misc-text">
              Rating: <span className="movie-misc-value">{ratings}/10</span>
            </p>

            <p className="movie-misc-text">
              Duration:
              <span className="movie-misc-value"> {duration} Minutes</span>
            </p>
            <p className="movie-misc-text">
              Release Date:
              <span className="movie-misc-value"> {releaseDate}</span>
            </p>
            <p className="movie-overview">{overview}</p>
          </div>
          {Array.isArray(movieCast) && movieCast.length > 0 && (
            <ul className="movie-cast-container">
              {movieCast.map(eachCast => (
                <li key={eachCast.id} className="each-cast-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${eachCast.profile_path}`}
                    alt={eachCast.original_name}
                    className="cast-image"
                  />
                  <p className="cast-name">
                    Original Name:{' '}
                    <span className="cast-name-value">
                      {eachCast.original_name}
                    </span>
                  </p>
                  <p className="cast-name">
                    Character Name:{' '}
                    <span className="cast-name-value">
                      {eachCast.character}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  renderSpecificDetailsFailureView = () => <h1>Not Found</h1>

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSpecificMovieDetails()
      case apiStatusConstants.failure:
        return this.renderSpecificDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    // const {apiStatus} = this.state

    // const {castId, originalName, characterName, castImage} = movieCastDetails

    return <>{this.renderSwitch()}</>
  }
}

export default SingleMovieDetails
