import { routes } from '../routes'
import fixture from './fixtures/routes-fares/schedules.json'

jest.mock('axios')

const axiosMock = jest.requireMock('axios').default as jest.Mock

describe('Routes', () => {
  function scrape() {
    return routes()
  }

  beforeEach(() => {
    axiosMock.mockResolvedValue({ data: fixture })
  })

  it('returns routes from the route fares schedules page', async () => {
    const result = await scrape()

    expect(axiosMock).toHaveBeenCalledWith(
      'https://www.bcferries.com/routes-fares/schedules',
    )
    expect(result).toStrictEqual({
      regions: [
        {
          name: 'Metro Vancouver',
          from: [
            {
              name: 'Vancouver (Tsawwassen)',
              code: 'TSA',
              to: [
                {
                  name: 'Galiano Island (Sturdies Bay)',
                  code: 'PSB',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-PSB',
                },
                {
                  name: 'Mayne Island (Village Bay)',
                  code: 'PVB',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-PVB',
                },
                {
                  name: 'Nanaimo (Duke Point)',
                  code: 'DUK',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-DUK',
                },
                {
                  name: 'Pender Island (Otter Bay)',
                  code: 'POB',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-POB',
                },
                {
                  name: 'Salt Spring Island (Long Harbour)',
                  code: 'PLH',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-PLH',
                },
                {
                  name: 'Saturna Island (Lyall Harbour)',
                  code: 'PST',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-PST',
                },
                {
                  name: 'Victoria (Swartz Bay)',
                  code: 'SWB',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-SWB',
                },
              ],
            },
            {
              name: 'Vancouver (Horseshoe Bay)',
              code: 'HSB',
              to: [
                {
                  name: 'Bowen Island (Snug Cove)',
                  code: 'BOW',
                  urlPath: '/routes-fares/schedules/seasonal/HSB-BOW',
                },
                {
                  name: 'Nanaimo (Departure Bay)',
                  code: 'NAN',
                  urlPath: '/routes-fares/schedules/seasonal/HSB-NAN',
                },
                {
                  name: 'Sunshine Coast (Langdale)',
                  code: 'LNG',
                  urlPath: '/routes-fares/schedules/seasonal/HSB-LNG',
                },
              ],
            },
          ],
        },
        {
          name: 'Vancouver Island',
          from: [
            {
              name: 'Victoria (Swartz Bay)',
              code: 'SWB',
              to: expect.arrayContaining([
                {
                  name: 'Salt Spring Island (Fulford Harbour)',
                  code: 'FUL',
                  urlPath: '/routes-fares/schedules/seasonal/SWB-FUL',
                },
                {
                  name: 'Vancouver (Tsawwassen)',
                  code: 'TSA',
                  urlPath: '/routes-fares/schedules/seasonal/SWB-TSA',
                },
              ]),
            },
            {
              name: 'Nanaimo (Departure Bay)',
              code: 'NAN',
              to: [
                {
                  name: 'Vancouver (Horseshoe Bay)',
                  code: 'HSB',
                  urlPath: '/routes-fares/schedules/seasonal/NAN-HSB',
                },
              ],
            },
            {
              name: 'Nanaimo (Duke Point)',
              code: 'DUK',
              to: [
                {
                  name: 'Vancouver (Tsawwassen)',
                  code: 'TSA',
                  urlPath: '/routes-fares/schedules/seasonal/DUK-TSA',
                },
              ],
            },
            {
              name: 'Nanaimo (Nanaimo Harbour)',
              code: 'NAH',
              to: expect.any(Array),
            },
            {
              name: 'Comox (Little River)',
              code: 'CMX',
              to: expect.any(Array),
            },
            {
              name: 'Port Hardy (Bear Cove)',
              code: 'PPH',
              to: expect.any(Array),
            },
            { name: 'Brentwood Bay', code: 'BTW', to: expect.any(Array) },
            { name: 'Buckley Bay', code: 'BKY', to: expect.any(Array) },
            { name: 'Campbell River', code: 'CAM', to: expect.any(Array) },
            { name: 'Chemainus', code: 'CHM', to: expect.any(Array) },
            { name: 'Crofton', code: 'CFT', to: expect.any(Array) },
            { name: 'Mill Bay', code: 'MIL', to: expect.any(Array) },
            { name: 'Port McNeill', code: 'MCN', to: expect.any(Array) },
          ],
        },
        {
          name: 'Sunshine Coast',
          from: [
            {
              name: 'Sunshine Coast (Langdale)',
              code: 'LNG',
              to: [
                {
                  name: 'Vancouver (Horseshoe Bay)',
                  code: 'HSB',
                  urlPath: '/routes-fares/schedules/seasonal/LNG-HSB',
                },
                {
                  name: 'Gambier (New Brighton) & Keats (Keats Landing)',
                  code: 'gambier-keats',
                  urlPath: '/routes-fares/schedules/gambier-keats',
                  special: true,
                },
              ],
            },
            {
              name: 'Powell River (Westview)',
              code: 'PWR',
              to: expect.any(Array),
            },
            {
              name: 'Powell River (Saltery Bay)',
              code: 'SLT',
              to: expect.any(Array),
            },
            {
              name: 'Sunshine Coast (Earls Cove)',
              code: 'ERL',
              to: expect.any(Array),
            },
            {
              name: 'Texada Island (Blubber Bay)',
              code: 'TEX',
              to: expect.any(Array),
            },
          ],
        },
        {
          name: 'Southern Gulf Islands',
          from: [
            {
              name: 'Vancouver (Tsawwassen)',
              code: 'TSA',
              to: expect.arrayContaining([
                {
                  name: 'Salt Spring Island (Long Harbour)',
                  code: 'PLH',
                  urlPath: '/routes-fares/schedules/seasonal/TSA-PLH',
                },
              ]),
            },
            {
              name: 'Victoria (Swartz Bay)',
              code: 'SWB',
              to: expect.arrayContaining([
                {
                  name: 'Salt Spring Island (Fulford Harbour)',
                  code: 'FUL',
                  urlPath: '/routes-fares/schedules/seasonal/SWB-FUL',
                },
              ]),
            },
            { name: 'Chemainus', code: 'CHM', to: expect.any(Array) },
            {
              name: 'Pender Island (Otter Bay)',
              code: 'POB',
              to: expect.any(Array),
            },
            {
              name: 'Galiano Island (Sturdies Bay)',
              code: 'PSB',
              to: expect.any(Array),
            },
            {
              name: 'Mayne Island (Village Bay)',
              code: 'PVB',
              to: expect.any(Array),
            },
            {
              name: 'Saturna Island (Lyall Harbour)',
              code: 'PST',
              to: expect.any(Array),
            },
            {
              name: 'Gabriola Island (Descanso Bay)',
              code: 'GAB',
              to: expect.any(Array),
            },
            {
              name: 'Penelakut Island (Telegraph Harbour)',
              code: 'PEN',
              to: expect.any(Array),
            },
            {
              name: 'Salt Spring Island (Long Harbour)',
              code: 'PLH',
              to: expect.any(Array),
            },
            {
              name: 'Salt Spring Island (Vesuvius Bay)',
              code: 'VES',
              to: expect.any(Array),
            },
            {
              name: 'Salt Spring Island (Fulford Harbour)',
              code: 'FUL',
              to: expect.any(Array),
            },
            {
              name: 'Thetis Island (Preedy Harbour)',
              code: 'THT',
              to: expect.any(Array),
            },
          ],
        },
        {
          name: 'Northern Gulf Islands',
          from: [
            {
              name: 'Cormorant Island (Alert Bay)',
              code: 'ALR',
              to: expect.any(Array),
            },
            {
              name: 'Cortes Island (Whaletown)',
              code: 'COR',
              to: expect.any(Array),
            },
            {
              name: 'Denman Island West',
              code: 'DNM',
              to: expect.any(Array),
            },
            {
              name: 'Denman Island East (Gravelly Bay)',
              code: 'DNE',
              to: expect.any(Array),
            },
            {
              name: 'Hornby Island (Shingle Spit)',
              code: 'HRN',
              to: expect.any(Array),
            },
            {
              name: 'Malcolm Island (Sointula)',
              code: 'SOI',
              to: expect.any(Array),
            },
            {
              name: 'Quadra Island (Heriot Bay)',
              code: 'HRB',
              to: expect.any(Array),
            },
            {
              name: 'Quadra Island (Quathiaski Cove)',
              code: 'QDR',
              to: expect.any(Array),
            },
          ],
        },
        {
          name: 'Central Coast',
          from: [
            {
              name: 'Port Hardy (Bear Cove)',
              code: 'PPH',
              to: expect.any(Array),
            },
            { name: 'Bella Coola', code: 'BEC', to: expect.any(Array) },
            {
              name: 'Bella Bella (McLoughlin Bay)',
              code: 'PBB',
              to: expect.any(Array),
            },
            { name: 'Ocean Falls', code: 'POF', to: expect.any(Array) },
            { name: 'Shearwater', code: 'SHW', to: expect.any(Array) },
            { name: 'Klemtu', code: 'KLE', to: expect.any(Array) },
          ],
        },
        {
          name: 'North Coast',
          from: [
            { name: 'Prince Rupert', code: 'PPR', to: expect.any(Array) },
            { name: 'Klemtu', code: 'KLE', to: expect.any(Array) },
          ],
        },
        {
          name: 'Haida Gwaii',
          from: [
            {
              name: 'Graham Island (Skidegate)',
              code: 'PSK',
              to: expect.any(Array),
            },
            { name: 'Moresby Island', code: 'ALF', to: expect.any(Array) },
            { name: 'Prince Rupert', code: 'PPR', to: expect.any(Array) },
          ],
        },
      ],
    })
  })
})
