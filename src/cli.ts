import { sourceForType } from './lib'

const sources = ['bcf'] as const
type SourceType = (typeof sources)[number]

const commands = ['routes', 'sailing', 'current', 'daily', 'seasonal'] as const
type CommandType = (typeof commands)[number]

const args = process.argv.slice(2)

function help() {
  if (!args[0]) {
    console.log(
      `usage: scrapemyferry <source> <${commands.join(' | ')}> [FROM] [TO] [...TIME_ARGS]`,
    )
    console.log(
      'run scrapemyferry help <command> for more information about a command',
    )
    process.exit(0)
  }

  if (args[0] === 'help') {
    switch (args[1]) {
      case 'routes':
        console.log('list all routes')
        console.log(`usage: scrapemyferry <source> routes`)
        console.log(`e.g.,: scrapemyferry bcf routes`)
        break
      case 'sailing':
        console.log('list details for a specific sailing')
        console.log(
          `usage: scrapemyferry <source> sailing <FROM> <TO> <DEPARTURE_TIME> [DEPARTURE_DATE]`,
        )
        console.log(
          `e.g.,: scrapemyferry bcf sailing HSB LNG 2:10pm 2025-01-01`,
        )
        break
      case 'current':
        console.log('list current conditions and schedule for a route')
        console.log(`usage: scrapemyferry <source> current <FROM> <TO>`)
        console.log(`e.g.,: scrapemyferry bcf current HSB LNG`)
        break
      case 'daily':
        console.log('list daily schedule for a route')
        console.log(`usage: scrapemyferry <source> daily <FROM> <TO> [DATE]`)
        console.log(`e.g.,: scrapemyferry bcf daily HSB LNG 2025-01-01`)
        break
      case 'seasonal':
        console.log('list seasonal weekly schedule for a route')
        console.log(`usage: scrapemyferry <source> seasonal <FROM> <TO>`)
        console.log(`e.g.,: scrapemyferry bcf seasonal HSB LNG`)
        break
      default:
        console.log(`commands: ${commands.join(', ')}`)
        console.log('- routes: list all routes')
        console.log('- sailing: list details for a specific sailing')
        console.log(
          '- current: list current conditions and schedule for a route',
        )
        console.log('- daily: list daily schedule for a route')
        console.log('- seasonal: list seasonal weekly schedule for a route')
        break
    }
    process.exit(0)
  }

  if (!sources.includes(args[0] as SourceType)) {
    console.log(`unknown source: ${args[0]}`)
    console.log('Supported sources: ', sources.join(', '))
    process.exit(1)
  }

  console.log(args[1] ? `unknown command: ${args[1]}` : 'missing command')
  console.log(`Supported commands: ${commands.join(', ')}`)
  process.exit(1)
}

if (!args[0] || !args[1] || args[0] === 'help') {
  help()
}

console.log('args', args)

const [
  sourceType = 'bcf' as SourceType,
  type = 'current' as CommandType,
  from = 'HSB',
  to = 'LNG',
  timeArg = '',
] = args

const source = sourceForType(sourceType)
if (!source) {
  help()
  process.exit(1)
}

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
    help()
    break
}
