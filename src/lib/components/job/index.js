
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getLowestBid } from '../../utilities'
import WinningBid from '../winning-bid'
import TimeRemaining from '../time-remaining'
import LowestBid from '../lowest-bid'
import { InputRadio, InputDate, InputNumber } from '../input'
import DateString from '../date-string'
import Field from '../field'
import If from '../if'
import IfElse from '../if-else'

import './style.css'

export default class Job extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMetric: 'flat',
      fetching: false,
      job: {}
    }
    this.setMetric = this.setMetric.bind(this)
  }
  setMetric(e) {
    this.setState({
      selectedMetric: e.target.value
    })
  }
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.setState({
      fetching: true
    })
    fetch(`/api/jobs/${id}?_embed=bids`)
      .then(x => x.json())
      .then(job =>
        this.setState({
          job,
          fetching: false
        }))
  }
  render() {
    const { selectedMetric, job, fetching } = this.state
    const {
      title,
      description,
      createdDate,
      endingDate,
      bids = []
    } = job
    const biddingClosed = moment(endingDate).diff(new Date()) <= 0
    const selectedMetricFlat = selectedMetric === 'flat'
    return (
      <div className='job-page'>
        <div>
          <h1><Link to='/'>Jobs</Link> > {fetching ? 'Loading...' : title}</h1>
          <If condition={!fetching}>
            <div className='grid'>
              <div className='grid-column'>
                <h2 className='title'>Details</h2>
                <ul>
                  <li><strong>Created on</strong>: <DateString>{createdDate}</DateString></li>
                  <li><strong>Ending on</strong>: <DateString>{endingDate}</DateString></li>
                  <li>
                    <strong>Time Left</strong>: {' '}
                    <IfElse condition={biddingClosed}>
                      <span>00:00:00</span>
                      <TimeRemaining>{endingDate}</TimeRemaining>
                    </IfElse>
                  </li>
                  <li><strong>Number of bids</strong>: {bids.length}</li>
                  <If condition={bids.length}>
                    <li><strong>Lowest Bid</strong>: <LowestBid>{bids}</LowestBid></li>
                  </If>
                </ul>
              </div>
              <IfElse condition={biddingClosed}>
                <WinningBid bid={getLowestBid(bids)} />
                <form className='grid-column'>
                  <div>
                    <h2 className='title'>Place Bid</h2>
                    <Field
                      name='metric.value'
                      label='Value'
                      onChange={() => {}}
                      component={InputNumber}
                      value=''
                      min='0.01'
                      step='0.01'
                      required />
                  </div>
                  <div className='metric-options'>
                    <h3 className='title'>Choose Metric</h3>
                    <Field
                      display='inline'
                      name='metric'
                      label='Flat'
                      onChange={this.setMetric}
                      component={InputRadio}
                      value='flat'
                      checked={selectedMetricFlat}
                      required />
                    <Field
                      display='inline'
                      name='metric'
                      label='Hourly'
                      onChange={this.setMetric}
                      component={InputRadio}
                      value='hourly'
                      checked={!selectedMetricFlat}
                      required />
                    <If condition={!selectedMetricFlat}>
                      <Field
                        display='inline'
                        name='metric.multiplier'
                        label='Estimate Hours'
                        onChange={() => {}}
                        component={InputNumber}
                        value=''
                        min='1'
                        step='1'
                        required />
                    </If>
                    <Field
                      name='endingDate'
                      label='Ending Date'
                      onChange={() => {}}
                      component={InputDate}
                      value=''
                      required />
                  </div>
                  <button type='submit'>Submit</button>
                </form>
              </IfElse>
            </div>
            <div className='description'>
              <h2 className='title'>Description</h2>
              <p>{description}</p>
            </div>
          </If>
        </div>
      </div>)
  }
}
