import { currentConditionsBeta } from '../currentConditionsBeta'

describe('Current Conditions Beta', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(
    process.env.LIVE_TESTS,
    'LIVE test',
    async () => {
      const result = await currentConditionsBeta('HSB', 'LNG')

      expect(result).toBeDefined()
      expect(result.url).toBeDefined()
      expect(result.lastUpdated).toBeDefined()
      expect(result.links).toBeDefined()
      expect(result.links.booking).toBeDefined()
      expect(result.links.departuresArrivals).toBeDefined()
      expect(result.links.calculateFare).toBeDefined()
      expect(result.links.schedule).toBeDefined()
      expect(result.links.trackingMap).toBeDefined()

      expect(result.arrivedUnderway).toBeDefined()
      expect(result.arrivedUnderway.length).toBeGreaterThan(0)
      expect(result.arrivedUnderway[0].scheduled).toBeDefined()
      expect(result.arrivedUnderway[0].departed).toBeDefined()
      expect(result.arrivedUnderway[0].arrived).toBeDefined()
      expect(result.arrivedUnderway[0].vessel).toBeDefined()
      expect(result.arrivedUnderway[0].vessel.name).toBeDefined()
      expect(result.arrivedUnderway[0].vessel.url).toBeDefined()
      expect(result.arrivedUnderway[0].status).toBeDefined()
      expect(result.arrivedUnderway[0].status.delayed).toBeDefined()

      expect(result.upcoming).toBeDefined()
      expect(result.upcoming.length).toBeGreaterThan(0)
      expect(result.upcoming[0].nextAvailable).toBeDefined()
      expect(result.upcoming[0].scheduled).toBeDefined()
      expect(result.upcoming[0].etd).toBeDefined()
      expect(result.upcoming[0].eta).toBeDefined()
      expect(result.upcoming[0].vessel).toBeDefined()
      expect(result.upcoming[0].vessel.name).toBeDefined()
      expect(result.upcoming[0].vessel.url).toBeDefined()
      expect(result.upcoming[0].status).toBeDefined()
      expect(result.upcoming[0].status.delayed).toBeDefined()
      expect(result.upcoming[0].availableSpace).toBeDefined()
      expect(result.upcoming[0].notCheckedIn).toBeDefined()
      expect(result.upcoming[0].checkedIn).toBeDefined()
      expect(result.upcoming[0].checkinOpensAt).toBeDefined()
      expect(result.upcoming[0].spaceReleasedAt).toBeDefined()

      expect(result.tomorrow).toBeDefined()
      expect(result.tomorrow.length).toBeGreaterThan(0)
      expect(result.tomorrow[0].scheduled).toBeDefined()
      expect(result.tomorrow[0].etd).toBeDefined()
      expect(result.tomorrow[0].vessel).toBeDefined()
      expect(result.tomorrow[0].vessel.name).toBeDefined()
      expect(result.tomorrow[0].vessel.url).toBeDefined()
      expect(result.tomorrow[0].availableSpace).toBeDefined()

      expect(result.cameras).toBeDefined()
      expect(result.cameras.lastUpdated).toBeDefined()
      expect(result.cameras.webcams).toBeDefined()
      expect(result.cameras.webcams.length).toBeGreaterThan(0)

      expect(result.terminal).toBeDefined()
      expect(result.terminal.name).toBeDefined()
      expect(result.terminal.address).toBeDefined()

      // expect(result.nextSailing).toBeDefined()
      // expect(result.nextSailing.scheduled).toBeDefined()
      // expect(result.nextSailing.totalSpace).toBeDefined()
      // expect(result.trackingMap).toBeDefined()
      // expect(result.departures).toBeDefined()
      // expect(result.departures.length).toBeGreaterThan(0)

      // expect(result.departures[0].departure).toBeDefined()
      // expect(result.departures[0].departure.scheduled).toBeDefined()
      // expect(result.departures[0].departure.actual).toBeDefined()
      // expect(result.departures[0].departure.vessel).toBeDefined()
      // expect(result.departures[0].departure.vessel.name).toBeDefined()
      // expect(result.departures[0].departure.vessel.url).toBeDefined()
    },
    30_000,
  )
})
