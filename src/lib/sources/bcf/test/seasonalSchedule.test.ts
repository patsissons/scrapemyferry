import dayjs from 'dayjs'
import { seasonalSchedule } from '../seasonalSchedule'
import fixture from './fixtures/routes-fares/schedules/seasonal.json'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Seasonal Schedule', () => {
  function scrape({
    from = 'HSB',
    to = 'LNG',
  }: {
    from?: string
    to?: string
  } = {}) {
    return seasonalSchedule(from, to)
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it('returns the seasonal schedule for the provided route', async () => {
    const result = await scrape()

    const url =
      'https://www.bcferries.com/routes-fares/schedules/seasonal/HSB-LNG'

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      days: [
        {
          day: 'MONDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
        {
          day: 'TUESDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
        {
          day: 'WEDNESDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
        {
          day: 'THURSDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
        {
          day: 'FRIDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
        {
          day: 'SATURDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
        {
          day: 'SUNDAY',
          sailings: [
            {
              depart: '7:30 AM',
              arrive: '8:10 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '9:45 AM',
              arrive: '10:25 AM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '11:55 AM',
              arrive: '12:35 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '2:10 PM',
              arrive: '2:50 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '4:20 PM',
              arrive: '5:00 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '5:30 PM',
              arrive: '6:10 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '7:50 PM',
              arrive: '8:30 PM',
              duration: '00:40',
              messages: [],
            },
            {
              depart: '10:55 PM',
              arrive: '11:35 PM',
              duration: '00:40',
              messages: [],
            },
          ],
        },
      ],
    })
  })

  it('builds the correct URL for the provided terminals', async () => {
    await scrape({ from: 'TSW', to: 'DUK' })

    expect(axiosMock).toHaveBeenCalledWith(
      'https://www.bcferries.com/routes-fares/schedules/seasonal/TSW-DUK',
    )
  })
})
