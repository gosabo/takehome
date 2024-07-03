// This file is used to generate mock data for the listings.
const fs = require('fs')

const citiesByState = require('./location.json')

const states = Object.keys(citiesByState)

type Activity = 'Hunting' | 'Fishing' | 'Camping'

const modifiersByActivity: { [key in Activity]: string[] } & {
  [key: string]: string[]
} = {
  Hunting: [
    'Deer',
    'Elk',
    'Moose',
    'Bear',
    'Wild Boar',
    'Turkey',
    'Duck',
    'Pheasant',
    'Quail',
    'Rabbit',
    'Squirrel',
    'Goose',
    'Coyote',
    'Mountain Lion',
    'Bison',
    'Antelope',
    'Fox',
    'Grouse',
    'Bobcat',
  ],
  Fishing: [
    'Fly',
    'Ice',
    'Deep Sea',
    'Shore',
    'Boat',
    'Lake',
    'River',
    'Ocean',
    'Stream',
    'Pond',
    'Trout',
    'Bass',
    'Salmon',
    'Pike',
    'Walleye',
    'Perch',
    'Carp',
    'Snapper',
    'Mackerel',
  ],
  Camping: [
    'Secluded',
    'Waterfront',
    'Forest',
    'Mountain',
    'Desert',
    'Lakeside',
    'Beachside',
    'Riverfront',
    'Backcountry',
    'Rustic',
    'Luxury',
    'Family-Friendly',
    'Pet-Friendly',
    'Accessible',
    'RV Hookups',
    'Tent Only',
  ],
}

type Listing = {
  id?: number
  title: string
  location: {
    city: string
    state: string
  }
  activity: Activity
  price: number
  rating: number
  imageUrl?: string
}

const activities = Object.keys(modifiersByActivity)

const generateMockListing = (): Listing => {
  const state = states[Math.floor(Math.random() * states.length)]
  const city =
    citiesByState[state][
      Math.floor(Math.random() * citiesByState[state].length)
    ]
  const activity = activities[
    Math.floor(Math.random() * activities.length)
  ] as Activity
  const modifier =
    modifiersByActivity[activity][
      Math.floor(Math.random() * modifiersByActivity[activity].length)
    ]
  const rating = (() => {
    return parseFloat((Math.random() * (5.0 - 4.0) + 4.0).toFixed(2))
  })()
  const price = (() => {
    return Math.floor(Math.random() * 80) * 5 + 200
  })()
  const location = Math.random() > 0.5 ? city : state

  return {
    title: `${modifier} ${activity} in ${location}`,
    location: {
      city,
      state,
    },
    activity,
    rating,
    price,
  }
}
let listings = []
for (let i = 0; i < 1000; i++) {
  const listing = generateMockListing()
  listing.id = i + 1
  listing.imageUrl = `https://picsum.photos/600/400?random=${i}`
  listings.push(listing)
}
const filePath = './listings.json' // Specify the path to the output file
const data = JSON.stringify(listings, null, 2) // Convert the listings array to a pretty-printed JSON string
fs.writeFileSync(filePath, data, 'utf8') // Write the JSON string to the file

console.log(`Listings written to ${filePath}`)
