import Header from '../Header'

import Pagination from '../Pagination'

import './index.css'

const NotFound = () => {
  ;<SearchedMovieContext.Consumer>
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
          <Header className="not-found-header" />
          <div className="not-found-container">
            <h1 className="not-found-heading">
              The page your'e looking for is Not Found. Try Searching for other
              resource
            </h1>
          </div>
          <div className="pagination-container">
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
          </div>
        </>
      )
    }}
  </SearchedMovieContext.Consumer>
}
export default NotFound
