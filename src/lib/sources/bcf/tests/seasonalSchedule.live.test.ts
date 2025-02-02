import { seasonalSchedule } from '../seasonalSchedule'

describe('Seasonal Schedule', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(
    process.env.LIVE_TESTS,
    'LIVE test',
    async () => {
      const result = await seasonalSchedule('HSB', 'LNG')

      expect(result).toBeDefined()
      expect(result.url).toBeDefined()
      expect(result.days).toBeDefined()
      expect(result.days.length).toBeGreaterThan(0)

      expect(result.days[0].day).toBeDefined()
      expect(result.days[0].sailings).toBeDefined()
      expect(result.days[0].sailings.length).toBeGreaterThan(0)

      expect(result.days[0].sailings[0].depart).toBeDefined()
      expect(result.days[0].sailings[0].arrive).toBeDefined()
      expect(result.days[0].sailings[0].duration).toBeDefined()
      expect(result.days[0].sailings[0].messages).toBeDefined()
    },
    30_000,
  )
})
