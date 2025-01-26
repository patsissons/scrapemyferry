import { currentConditions } from '../currentConditions'

describe('Current Conditions', () => {
  // this is necessary for jest to not complain about an empty test suite
  it('live tests disabled by default', () => {})

  it.if(process.env.LIVE_TESTS, 'LIVE test', async () => {})
})
