import Header from '../Header'

import Pagination from '../Pagination'

import './index.css'

const NotFound = () => {
  return (
    <>
      <Header className="not-found-header" />
      <div className="not-found-container">
        <h1 className="not-found-heading">
          The page your'e looking for is Not Found. Try Searching for other
          resource
        </h1>
      </div>
    </>
  )
}
export default NotFound
