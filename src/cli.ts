import { sourceForType } from './lib'

const sources = ['bcf'] as const
type SourceType = (typeof sources)[number]

const types = ['routes', 'sailing', 'current', 'daily', 'seasonal'] as const
type CommandType = (typeof types)[number]

const [
  sourceType = 'bcf' as SourceType,
  type = 'current' as CommandType,
  from = 'HSB',
  to = 'LNG',
  timeArg = '',
] = process.argv

const source = sourceForType(sourceType)

switch (type) {
  case 'routes':
    source.routes().then(console.log)
    break
  case 'sailing':
    source.sailing(from, to, timeArg).then(console.log)
    break
  case 'current':
    source.currentConditions(from, to).then(console.log)
    break
  case 'daily':
    source.dailySchedule(from, to, timeArg).then(console.log)
    break
  case 'seasonal':
    source.seasonalSchedule(from, to).then(console.log)
    break
  default:
    console.log(
      `usage: scrapemyferry <${types.join(' | ')}> <FROM> <TO> [DEPARTURE_TIME]`,
    )
    break
}
