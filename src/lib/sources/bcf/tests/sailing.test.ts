import dayjs from 'dayjs'
import { sailing } from '../sailing'
import fixture from './fixtures/availability.json'
import { tz } from '../config'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Sailing', () => {
  const currentDate = dayjs().tz(tz).format('YYYY-MM-DD')

  function scrape({
    from = 'HSB',
    to = 'LNG',
    time = '14:10',
    date,
  }: { from?: string; to?: string; time?: string; date?: string } = {}) {
    return sailing(from, to, time, date)
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it('returns routes from the route fares schedules page for the current date', async () => {
    const result = await scrape()

    const url = `https://www.bcferries.com/sailing-availability?departureTime=${currentDate}%2014:10:00&routeCode=HSB-LNG`

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      time: dayjs(
        `${currentDate} 14:23:00`,
        'YYYY-MM-DD HH:mm:ss',
      ).toISOString(),
      space: {
        total: 0.2,
        standard: 0.03,
        mixed: 0.64,
      },
    })
  })

  it('sets the correct timestamp based on the provided time', async () => {
    const result = await scrape({ time: '2:10pm', date: '2025-01-01' })

    const url = `https://www.bcferries.com/sailing-availability?departureTime=2025-01-01%2014:10:00&routeCode=HSB-LNG`

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      time: dayjs('2025-01-01 14:23:00', 'YYYY-MM-DD HH:mm:ss').toISOString(),
      space: {
        total: 0.2,
        standard: 0.03,
        mixed: 0.64,
      },
    })
  })

  it('builds the correct URL for the provided terminals', async () => {
    await scrape({ from: 'TSW', to: 'DUK' })

    expect(axiosMock).toHaveBeenCalledWith(
      `https://www.bcferries.com/sailing-availability?departureTime=${currentDate}%2014:10:00&routeCode=TSW-DUK`,
    )
  })
})
