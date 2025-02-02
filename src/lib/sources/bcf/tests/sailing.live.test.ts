import { sailing } from '../sailing'

describe('Sailing', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(
    process.env.LIVE_TESTS,
    'LIVE test',
    async () => {
      const result = await sailing('HSB', 'LNG', '14:10')

      expect(result).toBeDefined()
      expect(result.url).toBeDefined()
      expect(result.time).toBeDefined()
      expect(result.time).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      )

      expect(result.space).toBeDefined()
      expect(result.space.total).toBeDefined()
      expect(result.space.total).toBeGreaterThan(0)
      expect(result.space.total).toBeLessThanOrEqual(1)
      expect(result.space.standard).toBeDefined()
      expect(result.space.standard).toBeGreaterThan(0)
      expect(result.space.standard).toBeLessThanOrEqual(1)
      expect(result.space.mixed).toBeDefined()
      expect(result.space.mixed).toBeGreaterThan(0)
      expect(result.space.mixed).toBeLessThanOrEqual(1)
    },
    30_000,
  )
})
