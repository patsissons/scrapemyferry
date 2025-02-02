import { departures } from '../departures'

describe('Departures', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(
    process.env.LIVE_TESTS,
    'LIVE test',
    async () => {
      const result = await departures('HSB')

      expect(result).toBeDefined()
      expect(result.url).toBeDefined()
      expect(result.name).toContain('Vancouver (Horseshoe Bay)')
      expect(result.terminals).toBeDefined()
      expect(result.terminals.length).toBeGreaterThan(0)

      expect(result.terminals[0].name).toBeDefined()
      expect(result.terminals[0].duration).toBeDefined()
      expect(result.terminals[0].departures).toBeDefined()
      expect(result.terminals[0].departures.length).toBeGreaterThan(0)

      expect(result.terminals[0].departures[0].times).toBeDefined()
      expect(result.terminals[0].departures[0].times.scheduled).toBeDefined()
      expect(result.terminals[0].departures[0].vessel).toBeDefined()
      expect(result.terminals[0].departures[0].vessel.name).toBeDefined()
      expect(result.terminals[0].departures[0].vessel.url).toBeDefined()
    },
    30_000,
  )
})
