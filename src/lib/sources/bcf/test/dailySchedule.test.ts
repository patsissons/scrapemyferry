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

  it('returns the daily schedule for the provided route and date', async () => {
    const result = await scrape()

    const url =
      'https://www.bcferries.com/routes-fares/schedules/daily/HSB-LNG?scheduleDate=01/01/2025'

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      sailings: [
        {
          depart: '7:30 AM',
          arrive: '8:10 AM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '9:45 AM',
          arrive: '10:25 AM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '11:55 AM',
          arrive: '12:35 PM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '2:10 PM',
          arrive: '2:50 PM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '4:20 PM',
          arrive: '5:00 PM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '5:30 PM',
          arrive: '6:10 PM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '7:50 PM',
          arrive: '8:30 PM',
          duration: '00:40',
          type: 'Non-stop',
        },
        {
          depart: '10:55 PM',
          arrive: '11:35 PM',
          duration: '00:40',
          type: 'Non-stop',
        },
      ],
    })
  })
})
