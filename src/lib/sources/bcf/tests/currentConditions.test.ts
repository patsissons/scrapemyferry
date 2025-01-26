import dayjs from 'dayjs'
import { currentConditions } from '../currentConditions'
import fixture from './fixtures/current-conditions.json'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Current Conditions', () => {
  function scrape() {
    return currentConditions('HSB', 'LNG')
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it.todo('tbd')
})
