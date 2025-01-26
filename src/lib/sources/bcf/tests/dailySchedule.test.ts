import dayjs from 'dayjs'
import { dailySchedule } from '../dailySchedule'
import fixture from './fixtures/routes-fares/schedules/daily.json'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Daily Schedule', () => {
  function scrape() {
    return dailySchedule('HSB', 'LNG', '2025-01-01')
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it.todo('tbd')
})
