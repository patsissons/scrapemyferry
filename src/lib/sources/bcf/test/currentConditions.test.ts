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

  it('returns the current conditions for the provided route', async () => {
    const result = await scrape()

    const url = 'https://www.bcferries.com/current-conditions/HSB-LNG'

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      lastUpdated: '4:34 PM',
      nextSailing: {
        scheduled: '4:20 PM',
        totalSpace: 0.17,
      },
      trackingMap: 'https://ccimg.bcferries.com/cc/support/vessels/route4.jpg',
      departures: [
        {
          departure: {
            scheduled: '7:30 AM',
            actual: '7:30 AM',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Arrived: 8:09 am',
        },
        {
          departure: {
            scheduled: '9:45 AM',
            actual: '9:44 AM',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Arrived: 10:22 am',
        },
        {
          departure: {
            scheduled: '11:55 AM',
            actual: '12:01 PM',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Arrived: 12:39 pm',
        },
        {
          departure: {
            scheduled: '2:10 PM',
            actual: '2:23 PM',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status:
            'Arrived: 3:01 pm We are loading and unloading multiple ships',
        },
        {
          departure: {
            scheduled: '4:20 PM',
            actual: '',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status:
            'Estimated vehicle space available 17% Details We are loading and unloading multiple ships',
        },
        {
          departure: {
            scheduled: '5:30 PM',
            actual: '',
            vessel: {
              name: 'Queen of Cowichan',
              url: '/ship-info/COW',
            },
          },
          status: 'Estimated vehicle space available 92% Details',
        },
        {
          departure: {
            scheduled: '7:50 PM',
            actual: '',
            vessel: {
              name: 'Queen of Cowichan',
              url: '/ship-info/COW',
            },
          },
          status: 'Estimated vehicle space available 88% Details',
        },
        {
          departure: {
            scheduled: '10:55 PM',
            actual: '',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Estimated vehicle space available 93% Details',
        },
        {
          departure: {
            scheduled: '7:30 AM',
            actual: '',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Estimated vehicle space available 63% Details',
        },
        {
          departure: {
            scheduled: '9:45 AM',
            actual: '',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Estimated vehicle space available 77% Details',
        },
        {
          departure: {
            scheduled: '11:55 AM',
            actual: '',
            vessel: {
              name: 'Queen of Coquitlam',
              url: '/ship-info/COQ',
            },
          },
          status: 'Estimated vehicle space available 75% Details',
        },
      ],
      terminal: {
        name: 'Vancouver (Horseshoe Bay)',
        address: '# 6750 Keith Rd , West Vancouver, V7W 2V1',
      },
      webcams: [
        {
          label: 'Traffic at the terminal',
          url: 'https://ccimg.bcferries.com/cc/support/terminals/cam1_HSB.jpg',
        },
        {
          label: 'Traffic to Sunshine Coast (Langdale)',
          url: 'https://ccimg.bcferries.com/cc/support/terminals/cam3_HSB.jpg',
        },
      ],
    })
  })
})
