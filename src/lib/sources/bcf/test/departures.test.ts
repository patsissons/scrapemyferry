import dayjs from 'dayjs'
import { departures } from '../departures'
import fixture from './fixtures/current-conditions/departures.json'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Departures', () => {
  function scrape() {
    return departures('HSB')
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it('returns the departures for the provided terminal', async () => {
    const result = await scrape()

    const url =
      'https://www.bcferries.com/current-conditions/departures?terminalCode=HSB'

    expect(axiosMock).toHaveBeenCalledWith(url)
    expect(result).toStrictEqual({
      url,
      name: 'Vancouver (Horseshoe Bay)',
      terminals: [
        {
          name: 'Bowen Island (Snug Cove)',
          duration: '19min',
          departures: [
            {
              times: {
                scheduled: '5:50 AM',
                actual: '5:50 AM',
                arrival: '6:07 AM',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '6:50 AM',
                actual: '7:03 AM',
                arrival: '7:20 AM',
              },
              status: 'Poor visibility due to fog. Will depart when safe.',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '8:00 AM',
                actual: '8:08 AM',
                arrival: '8:25 AM',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '9:05 AM',
                actual: '9:28 AM',
                arrival: '9:45 AM',
              },
              status: 'Weather delay. Departure as soon as it is safe.',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '10:15 AM',
                actual: '',
                arrival: '',
              },
              status: 'Cancelled',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '11:25 AM',
                actual: '',
                arrival: '',
              },
              status: 'Cancelled',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '12:35 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '2:20 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '3:30 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '4:35 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '5:45 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '6:50 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '8:00 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '9:00 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
            {
              times: {
                scheduled: '10:00 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Capilano',
                url: '/on-the-ferry/our-fleet/queen-of-capilano/QCAP',
              },
            },
          ],
        },
        {
          name: 'Sunshine Coast (Langdale)',
          duration: '39min',
          departures: [
            {
              times: {
                scheduled: '7:30 AM',
                actual: '7:29 AM',
                arrival: '8:10 AM',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
            {
              times: {
                scheduled: '9:45 AM',
                actual: '9:49 AM',
                arrival: '10:27 AM',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
            {
              times: {
                scheduled: '11:55 AM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
            {
              times: {
                scheduled: '2:10 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
            {
              times: {
                scheduled: '4:20 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
            {
              times: {
                scheduled: '5:30 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Cowichan',
                url: '/on-the-ferry/our-fleet/queen-of-cowichan/QCOW',
              },
            },
            {
              times: {
                scheduled: '7:50 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Cowichan',
                url: '/on-the-ferry/our-fleet/queen-of-cowichan/QCOW',
              },
            },
            {
              times: {
                scheduled: '10:55 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
          ],
        },
        {
          name: 'Nanaimo (Departure Bay)',
          duration: '1h 40min',
          departures: [
            {
              times: {
                scheduled: '6:15 AM',
                actual: '6:15 AM',
                arrival: '7:59 AM',
              },
              status: '',
              vessel: {
                name: 'Queen of Oak Bay',
                url: '/on-the-ferry/our-fleet/queen-of-oak-bay/QOAK',
              },
            },
            {
              times: {
                scheduled: '8:25 AM',
                actual: '8:30 AM',
                arrival: '10:06 AM',
              },
              status: '',
              vessel: {
                name: 'Queen of Cowichan',
                url: '/on-the-ferry/our-fleet/queen-of-cowichan/QCOW',
              },
            },
            {
              times: {
                scheduled: '10:40 AM',
                actual: '10:42 AM',
                arrival: '12:22 PM',
                arrivalIsEta: true,
              },
              status: '',
              vessel: {
                name: 'Queen of Oak Bay',
                url: '/on-the-ferry/our-fleet/queen-of-oak-bay/QOAK',
              },
            },
            {
              times: {
                scheduled: '1:00 PM',
                actual: '',
                arrival: '',
              },
              status: 'On time',
              vessel: {
                name: 'Queen of Cowichan',
                url: '/on-the-ferry/our-fleet/queen-of-cowichan/QCOW',
              },
            },
            {
              times: {
                scheduled: '3:45 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Oak Bay',
                url: '/on-the-ferry/our-fleet/queen-of-oak-bay/QOAK',
              },
            },
            {
              times: {
                scheduled: '6:35 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Coquitlam',
                url: '/on-the-ferry/our-fleet/queen-of-coquitlam/QCOQ',
              },
            },
            {
              times: {
                scheduled: '10:10 PM',
                actual: '',
                arrival: '',
              },
              status: '',
              vessel: {
                name: 'Queen of Cowichan',
                url: '/on-the-ferry/our-fleet/queen-of-cowichan/QCOW',
              },
            },
          ],
        },
      ],
    })
  })
})
