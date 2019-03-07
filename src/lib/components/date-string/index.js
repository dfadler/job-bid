
import React from 'react'
import moment from 'moment'

export default ({ children, format = 'MMMM Do YYYY, h:mm:ss a', fromNow =  false }) => {
  return <span>
    {fromNow
      ? new moment(children, format).fromNow()
      : new moment(children).format(format)}
  </span>
}