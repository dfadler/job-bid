
import React from 'react'
import { getLowestBid } from '../../utilities'

export default ({ children }) => {
  const lowestBid = getLowestBid(children)
  return (
    <span>$
      {lowestBid.rate.metric === 'flat'
        ? `${lowestBid.rate.value}/flat` 
        : `${lowestBid.rate.value}/hourly estimated hours ${lowestBid.rate.multiplier}`}
    </span>)
}