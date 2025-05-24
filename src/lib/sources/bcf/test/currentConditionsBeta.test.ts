import { currentConditionsBeta } from '../currentConditionsBeta'
import fixture from './fixtures/current-conditions-beta.json'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Current Conditions', () => {
  function scrape() {
    return currentConditionsBeta('HSB', 'LNG')
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it('returns the current conditions for the provided route', async () => {
    const result = await scrape()

    const url = 'https://www.bcferries.com/current-conditions-beta/HSB-LNG'

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      lastUpdated: '11:27 AM',
      links: {
        booking:
          'https://www.bcferries.com/?sailing=true&departureLocation=HSB&departureLocationName=West+Vancouver+-+Vancouver+(Horseshoe+Bay)&arrivalLocation=LNG&arrivalLocationName=Langdale+-+Sunshine+Coast+(Langdale)',
        departuresArrivals:
          'https://www.bcferries.com/current-conditions/departures?terminalCode=HSB',
        calculateFare:
          'https://www.bcferries.com/routes-fares/fare-calculator?departureLocation=HSB&arrivalLocation=LNG&scheduleDate=05%2f22%2f2025',
        schedule:
          'https://www.bcferries.com/routes-fares/schedules/daily/HSB-LNG',
        trackingMap:
          'https://ccimg.bcferries.com/cc/support/vessels/route4.jpg',
      },
      arrivedUnderway: [
        {
          arrived: '8:11 AM',
          departed: '7:33 AM',
          scheduled: '7:30 AM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          arrived: '10:47 AM',
          departed: '10:09 AM',
          scheduled: '9:50 AM',
          status: {
            delayed: true,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
      ],
      upcoming: [
        {
          availableSpace: 0,
          checkedIn: 0.86,
          checkinOpensAt: '11:10 AM',
          eta: '1:09 PM',
          etd: '12:29 PM',
          nextAvailable: true,
          notCheckedIn: 0.14,
          scheduled: '12:10 PM',
          spaceReleasedAt: '11:40 AM',
          status: {
            delayed: true,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 0.31,
          checkedIn: 0.14,
          checkinOpensAt: '1:25 PM',
          eta: '3:05 PM',
          etd: '2:25 PM',
          nextAvailable: false,
          notCheckedIn: 0.55,
          scheduled: '2:25 PM',
          spaceReleasedAt: '1:55 PM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 0.43,
          checkedIn: 0,
          checkinOpensAt: '3:45 PM',
          eta: '5:25 PM',
          etd: '4:45 PM',
          nextAvailable: false,
          notCheckedIn: 0.57,
          scheduled: '4:45 PM',
          spaceReleasedAt: '4:15 PM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 1,
          checkedIn: 0,
          checkinOpensAt: '4:30 PM',
          eta: '6:10 PM',
          etd: '5:30 PM',
          nextAvailable: false,
          notCheckedIn: 0,
          scheduled: '5:30 PM',
          spaceReleasedAt: '5:00 PM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Coquitlam',
            url: 'https://www.bcferries.com/ship-info/COQ',
          },
        },
        {
          availableSpace: 0.45,
          checkedIn: 0,
          checkinOpensAt: '6:05 PM',
          eta: '7:45 PM',
          etd: '7:05 PM',
          nextAvailable: false,
          notCheckedIn: 0.55,
          scheduled: '7:05 PM',
          spaceReleasedAt: '6:35 PM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 0.58,
          checkedIn: 0,
          checkinOpensAt: '8:25 PM',
          eta: '10:05 PM',
          etd: '9:25 PM',
          nextAvailable: false,
          notCheckedIn: 0.42,
          scheduled: '9:25 PM',
          spaceReleasedAt: '8:55 PM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 0.86,
          checkedIn: 0,
          checkinOpensAt: '10:30 PM',
          eta: '12:10 AM',
          etd: '11:30 PM',
          nextAvailable: false,
          notCheckedIn: 0.14,
          scheduled: '11:30 PM',
          spaceReleasedAt: '11:00 PM',
          status: {
            delayed: false,
          },
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
      ],
      tomorrow: [
        {
          availableSpace: 0.44,
          etd: '7:30 am',
          scheduled: '7:30 am',
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 0.44,
          etd: '9:50 am',
          scheduled: '9:50 am',
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
        {
          availableSpace: 0.44,
          etd: '12:10 pm',
          scheduled: '12:10 pm',
          vessel: {
            name: 'Queen of Surrey',
            url: 'https://www.bcferries.com/ship-info/SUR',
          },
        },
      ],
      cameras: {
        lastUpdated: '11:27 AM',
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
      },
      terminal: {
        address: '# 6750 Keith Rd , West Vancouver, V7W 2V1',
        name: 'Vancouver (Horseshoe Bay)',
      },
      // nextSailing: {
      //   scheduled: '4:20 PM',
      //   totalSpace: 0.17,
      // },
      // trackingMap: 'https://ccimg.bcferries.com/cc/support/vessels/route4.jpg',
      // departures: [
      //   {
      //     departure: {
      //       scheduled: '7:30 AM',
      //       actual: '7:30 AM',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Arrived: 8:09 am',
      //   },
      //   {
      //     departure: {
      //       scheduled: '9:45 AM',
      //       actual: '9:44 AM',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Arrived: 10:22 am',
      //   },
      //   {
      //     departure: {
      //       scheduled: '11:55 AM',
      //       actual: '12:01 PM',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Arrived: 12:39 pm',
      //   },
      //   {
      //     departure: {
      //       scheduled: '2:10 PM',
      //       actual: '2:23 PM',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status:
      //       'Arrived: 3:01 pm We are loading and unloading multiple ships',
      //   },
      //   {
      //     departure: {
      //       scheduled: '4:20 PM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status:
      //       'Estimated vehicle space available 17% Details We are loading and unloading multiple ships',
      //   },
      //   {
      //     departure: {
      //       scheduled: '5:30 PM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Cowichan',
      //         url: '/ship-info/COW',
      //       },
      //     },
      //     status: 'Estimated vehicle space available 92% Details',
      //   },
      //   {
      //     departure: {
      //       scheduled: '7:50 PM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Cowichan',
      //         url: '/ship-info/COW',
      //       },
      //     },
      //     status: 'Estimated vehicle space available 88% Details',
      //   },
      //   {
      //     departure: {
      //       scheduled: '10:55 PM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Estimated vehicle space available 93% Details',
      //   },
      //   {
      //     departure: {
      //       scheduled: '7:30 AM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Estimated vehicle space available 63% Details',
      //   },
      //   {
      //     departure: {
      //       scheduled: '9:45 AM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Estimated vehicle space available 77% Details',
      //   },
      //   {
      //     departure: {
      //       scheduled: '11:55 AM',
      //       actual: '',
      //       vessel: {
      //         name: 'Queen of Coquitlam',
      //         url: '/ship-info/COQ',
      //       },
      //     },
      //     status: 'Estimated vehicle space available 75% Details',
      //   },
      // ],
      // terminal: {
      //   name: 'Vancouver (Horseshoe Bay)',
      //   address: '# 6750 Keith Rd , West Vancouver, V7W 2V1',
      // },
      // webcams: [
      //   {
      //     label: 'Traffic at the terminal',
      //     url: 'https://ccimg.bcferries.com/cc/support/terminals/cam1_HSB.jpg',
      //   },
      //   {
      //     label: 'Traffic to Sunshine Coast (Langdale)',
      //     url: 'https://ccimg.bcferries.com/cc/support/terminals/cam3_HSB.jpg',
      //   },
      // ],
    })
  })
})
