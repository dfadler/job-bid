
import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import './pagination.css'

export default ({ totalPages = 0, resultsPerPage, currentPage, onChange, fetching, path }) => {
  if (!totalPages) return null
  const maxPages = Math.ceil(totalPages / resultsPerPage)
  const pages = 'a'.repeat(maxPages).split('').map((_, i) => {
    const pageNumber = i + 1
    return {
      pageNumber,
      currentPage: currentPage === pageNumber
    }
  })
  return (
    <nav
    className='pagination' 
    onClickCapture={e => {
      if (fetching) {
        e.preventDefault()
      }
    }}
    onClick={e => {
      e.preventDefault()
      if (e.target.closest('.is-current-page')) return
      const pageNumber = e.target.dataset.pagenumber
      if (Boolean(pageNumber)) onChange({ pageNumber: Number(pageNumber) })
    }}>
      <ul>
        {pages.map(({ currentPage, pageNumber }, i) =>
          <li key={i} className={classnames('page', { 'is-current-page': currentPage })}>
            <Link data-pagenumber={pageNumber} to={{
              pathname: path,
              search: `?page=${pageNumber}`
            }}>
              {pageNumber}
            </Link>
          </li>
        )}
      </ul>
    </nav>)
}
