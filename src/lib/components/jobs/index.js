
import React, { Component } from 'react'
import { parse, stringify } from 'query-string'
import pluralize from 'pluralize'
import { Link } from 'react-router-dom'
import IfElse from '../if-else'
import DateString from '../date-string'
import List from '../list'
import Pagination from '../pagination'

import './style.css'

const RESULTS_PER_PAGE = 100

export default class Jobs extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      totalPages: 0,
      statusFilter: '',
      currentPage: 0,
      fetching: false
    }
    this.update = this.update.bind(this)
    this.setStatusFilter = this.setStatusFilter.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const hasSearchChanged = this.props.location.search !== prevProps.location.search
    const hasStatusFilterChanged = this.state.statusFilter !== prevState.statusFilter

    if (hasSearchChanged || hasStatusFilterChanged) {
      this.getJobs()
    }
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs() {
    const { page: _currentPage = 1, fetching } = parse(this.props.location.search)
    const currentPage = Number(_currentPage)
    const statusFilter = this.state.statusFilter

    if (!fetching) {
      this.setState({
        fetching: true
      })

      const search = stringify({
        _page: currentPage,
        _limit: RESULTS_PER_PAGE,
        _embed: 'bids',
        ...(statusFilter ? { status: statusFilter } : {})
      })

      fetch(`/api/jobs?${search}`)
        .then(x => Promise.all([Promise.resolve(x), x.json()]))
        .then(([response, jobs]) => {
          const totalPages = Number(response.headers.get('X-Total-Count'))
          const currentPageExceedsMaxPage = totalPages !== 0 && currentPage > Math.ceil(totalPages / 100)

          if (currentPageExceedsMaxPage) {
            this.props.history.push({
              pathname: '/',
              search: '?page=1'
            })
          }

          this.setState({
            fetching: false,
            totalPages,
            currentPage,
            jobs
          })
        })
    }
  }

  update({ pageNumber: currentPage }) {
    this.setState({
      currentPage
    })
  }

  setStatusFilter(x) {
    this.setState({
      statusFilter: x.target.value
    })
  }

  render() {
    const { jobs, totalPages, fetching, statusFilter } = this.state
    const { page: currentPage } = parse(this.props.location.search)

    return (
      <div className='jobs'>
        <h1>Most Recent</h1>
        <div>
          <h2>Filters</h2>
          <div>
            <div>
              <h3>Job Status</h3>
              <select onChange={this.setStatusFilter} value={statusFilter}>
                <option value=''>All</option>
                <option value='OPEN'>Open</option>
                <option value='CLOSING'>Closing</option>
                <option value='CLOSED'>Closed</option>
              </select>
            </div>
          </div>
          <h2>Pages</h2>
          <Pagination
            path='/'
            fetching={fetching}
            resultsPerPage={RESULTS_PER_PAGE}
            currentPage={Number(currentPage)}
            totalPages={totalPages}
            onChange={this.update} />
        </div>
        <div className='jobs-list'>
        <IfElse condition={fetching}>
          <h2 className='loading title'>Loading...</h2>

          <List rowHeight={200} rowCount={jobs.length}>
              {({ key, style, index }) => {
                const { id, title, bids = [], endingDate, status } = jobs[index]
                return (
                  <div key={key} style={style}>
                    <div className='job-list-item'>
                      <h2 className='title'>
                        <Link to={`/jobs/${id}`}>
                          {title}
                        </Link>
                      </h2>
                      <p>Status: {status}</p>
                      <p>Number of {pluralize('bid', bids.length)}: {bids.length}</p>
                      <p>Bidding {status === 'CLOSED' ? 'ended' : 'ends'} {' '}
                        <DateString format='YYYYMMDD' fromNow>{endingDate}</DateString></p>
                    </div>
                  </div>)
              }}
            </List>
            <div>Foo bar</div>
          </IfElse>
        </div>
      </div>)
  }
}