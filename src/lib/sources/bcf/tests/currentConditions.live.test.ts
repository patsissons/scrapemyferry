import { currentConditions } from '../currentConditions'

describe('Current Conditions', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(
    process.env.LIVE_TESTS,
    'LIVE test',
    async () => {
      const result = await currentConditions('HSB', 'LNG')

      expect(result).toBeDefined()
      expect(result.url).toBeDefined()
      expect(result.lastUpdated).toBeDefined()
      expect(result.nextSailing).toBeDefined()
      expect(result.nextSailing.scheduled).toBeDefined()
      expect(result.nextSailing.totalSpace).toBeDefined()
      expect(result.trackingMap).toBeDefined()
      expect(result.departures).toBeDefined()
      expect(result.departures.length).toBeGreaterThan(0)

      expect(result.departures[0].departure).toBeDefined()
      expect(result.departures[0].departure.scheduled).toBeDefined()
      expect(result.departures[0].departure.actual).toBeDefined()
      expect(result.departures[0].departure.vessel).toBeDefined()
      expect(result.departures[0].departure.vessel.name).toBeDefined()
      expect(result.departures[0].departure.vessel.url).toBeDefined()
    },
    30_000,
  )
})
