
import React, { Component } from 'react'
import IfElse from '../if-else'

export default class WinningBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      fetching: false,
      mounted: false
    }
  }
  static defaultProps = {
    bid: {
      userId: -1
    }
  }
  componentDidMount() {
    this.setState({
      mounted: true
    })

    if (this.props.userId === -1) return

    this.setState({
      fetching: true
    })

    fetch(`/api/users?id=${this.props.bid.userId}`)
      .then(x => x.json())
      .then(([user]) => {
        if (this.state.mounted) {
          this.setState({
            fetching: false,
            user
          })
        }
      })
  }
  componentWillUnmount() {
    this.setState({
      mounted: false
    })
  }
  render() {
    return (
      <div>
        <h2>Bidding Closed</h2>
        <IfElse condition={this.state.fetching}>
          <div>Loading...</div>
          <p>Congratulations <strong>{this.state.user.name}</strong>!</p>
        </IfElse>
      </div>)
  }
}