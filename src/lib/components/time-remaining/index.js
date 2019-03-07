
import React, { Component } from 'react'
import moment from 'moment'
import Interval from '../interval'

export default class TimeRemaining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: '-00:00:00'
    }
    this.calculateRemainingTime = this.calculateRemainingTime.bind(this)
  }
  calculateRemainingTime() {
    const { children } = this.props
    const now  = new Date().toISOString();
    const ms = moment(new moment(children)).diff(moment(new moment(now)));
    const d = moment.duration(ms);
    this.setState({
      timeRemaining: Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss")
    })
  }
  componentDidMount() {
    this.calculateRemainingTime()
  }
  render() {
    return (
      <span>
        <Interval timeout={1000}>
          {this.calculateRemainingTime}
        </Interval>
        {this.state.timeRemaining}
      </span>)
  }
} 