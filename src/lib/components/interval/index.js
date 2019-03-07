
import { Component } from 'react'

export default class Interval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: false
    }
  }
  componentDidMount() {
    this.interval = setInterval(
      this.props.children,
      this.props.timeout)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return null
  }
}
