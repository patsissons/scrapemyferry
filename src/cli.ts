import {
  availability,
  currentConditions,
  dailySchedule,
  seasonalSchedule,
} from './lib'

const type = process.argv[2] || 'current'
const from = process.argv[3] || 'HSB'
const to = process.argv[4] || 'LNG'

switch (type) {
  case 'availability':
    availability(from, to, process.argv[5]).then(console.log)
    break
  case 'current':
    currentConditions(from, to).then(console.log)
    break
  case 'daily':
    dailySchedule(from, to).then(console.log)
    break
  case 'seasonal':
    seasonalSchedule(from, to).then(console.log)
    break
  default:
    console.log(
      'usage: scrapemyferry <current | seasonal | daily> <FROM> <TO> [...args]',
    )
    break
}
