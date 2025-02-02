import { dailySchedule } from '../dailySchedule'

describe('Daily Schedule', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(
    process.env.LIVE_TESTS,
    'LIVE test',
    async () => {
      const result = await dailySchedule('HSB', 'LNG')

      expect(result).toBeDefined()
      expect(result.url).toBeDefined()
      expect(result.sailings).toBeDefined()
      expect(result.sailings.length).toBeGreaterThan(0)

      expect(result.sailings[0].depart).toBeDefined()
      expect(result.sailings[0].arrive).toBeDefined()
      expect(result.sailings[0].duration).toBeDefined()
      expect(result.sailings[0].type).toBeDefined()
    },
    30_000,
  )
})
