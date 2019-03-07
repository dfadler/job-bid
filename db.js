
const moment = require('moment')

const getStatus = endingDate => {
  const then = moment(endingDate)
  return (then.diff(new Date(), 'days') > 1)
    ? 'OPEN' 
    : 'CLOSING'
}

module.exports = () => ({
  "jobs": "a".repeat(2000).split('').map((x, i) => {
    const createdDate = new Date()
    const tEndingDate = new Date()
    const calculateEndingDate = (x, y) => {
      const fn = (i % 2 === 0) ? (a, b) => a + b : (a, b) => a - b
      return fn(x, y)
    }
    const endingDate = new Date(
        tEndingDate.setDate(calculateEndingDate(tEndingDate.getDate(), (Math.floor(Math.random() * 7) + 1))))
        .toISOString()
    return {
      "status": ((i % 2) !== 0) ? 'CLOSED' : getStatus(endingDate),
      "createdDate": new Date(
        createdDate.setDate(createdDate.getDate() - 1))
        .toISOString(),
      endingDate,
      "title": `Job ${i+1} title`,
      "id": i + 1,
      "description": `Job ${i + 1} description. Consectetur amet magna fugiat laborum veniam qui velit nostrud nulla aliqua enim nisi ad labore elit ea tempor sint nisi mollit nulla labore elit pariatur ullamco sit in non consectetur cupidatat consectetur incididunt occaecat sed consequat adipisicing qui ea laboris fugiat id minim cillum qui aliqua ad enim esse velit minim laborum duis dolor fugiat eu culpa ullamco velit minim sint elit consequat ut quis duis magna culpa officia anim sit commodo ullamco incididunt consectetur in cupidatat est cillum voluptate exercitation id nulla mollit adipisicing ut voluptate amet voluptate laboris in duis cillum sint aute dolor ut esse consequat est minim sed fugiat consectetur quis aliqua sunt commodo magna occaecat ut sed amet dolor ullamco in ut officia esse est enim ad dolore amet dolore duis laboris enim consequat officia reprehenderit pariatur et tempor amet eiusmod incididunt cillum pariatur ex laborum consequat occaecat do in esse sed voluptate eu veniam mollit consectetur do ea laborum eu magna magna aliqua labore non anim incididunt duis sed anim consequat id mollit nostrud ut sed irure minim in non esse ut consequat minim voluptate excepteur in velit esse cillum cupidatat sed officia eiusmod aute pariatur laboris dolor sit sit ad.`
    }
  }),
  "bids": "a".repeat(10000).split('').map((x, i) => ({
    id: i + 1,
    jobId: Math.floor(Math.random() * 2000) + 1,
    userId: Math.floor(Math.random() * 100) + 1,
    rate: (i % 2 === 0) ? {
      value: Math.floor(Math.random() * 2000) + 500,
      metric: 'hourly',
      multiplier: Math.floor(Math.random() * 200) + 1 
    } : {
      value: Math.floor(Math.random() * 2000) + 500,
      metric: 'flat'
    }
  })),
  "users": "a".repeat(100).split('').map((x, i) => ({
    id: i + 1,
    name: `User ${i+1} Name`,
    email: `user-${i+1}@example.com`,
  }))
})