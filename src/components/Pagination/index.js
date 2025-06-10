import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const Pagination = () => (
  <SearchedMovieContext.Consumer>
    {value => {
      const {renderNextPage, renderPrevPage, pageNumber} = value

      const onClickingPrevBtn = () => {
        renderPrevPage()
      }
      const onClickingNxtBtn = () => {
        renderNextPage()
      }
      return (
        <>
          <button
            type="button"
            className="pagination-btn"
            onClick={onClickingPrevBtn}
          >
            Prev
          </button>
          <p className="page-number">{pageNumber}</p>
          <button
            type="button"
            className="pagination-btn"
            onClick={onClickingNxtBtn}
          >
            Next
          </button>
        </>
      )
    }}
  </SearchedMovieContext.Consumer>
)

export default Pagination
