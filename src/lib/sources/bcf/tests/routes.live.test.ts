import { routes } from '../routes'

describe('Routes', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(process.env.LIVE_TESTS, 'LIVE test', async () => {
    const result = await routes()

    expect(result).toBeDefined()
    expect(result.regions).toBeDefined()
    expect(result.regions.length).toBeGreaterThan(0)

    const [firstRegion] = result.regions
    expect(firstRegion.name).toBeDefined()
    expect(firstRegion.from).toBeDefined()
    expect(firstRegion.from.length).toBeGreaterThan(0)

    const [firstFrom] = firstRegion.from
    expect(firstFrom.name).toBeDefined()
    expect(firstFrom.code).toBeDefined()
    expect(firstFrom.to).toBeDefined()
    expect(firstFrom.to.length).toBeGreaterThan(0)

    const [firstTo] = firstFrom.to
    expect(firstTo.name).toBeDefined()
    expect(firstTo.urlPath).toBeDefined()
    expect(firstTo.urlPath).toStartWith('/routes-fares/schedules/seasonal/')
  })
})
