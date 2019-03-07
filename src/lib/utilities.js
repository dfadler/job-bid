
export const getLowestBid = bids => {
  const calculated = bids.map(({ rate }) => {
    if (rate.metric === 'flat') return rate.value
    return rate.value * rate.multiplier
  })

  return bids[calculated.indexOf(Math.min(...calculated))]
}