import scrapeIt from 'scrape-it'
import type { Routes } from '../types'
import { baseUrl, routesUrl } from './urls'

interface RoutesData {
  regionNames: string[]
  regions: {
    from: {
      name: string
      to: {
        routes: {
          name: string
          href: string
        }[]
      }
    }[]
  }[]
}

export function routes() {
  return scrapeIt<RoutesData>(routesUrl(), {
    regionNames: {
      listItem: '#schedulesList header > span',
    },
    regions: {
      listItem: '#schedulesList header + div',
      data: {
        from: {
          listItem: '.container.card',
          data: {
            name: {
              selector: 'button',
            },
            to: {
              selector: 'p',
              data: {
                routes: {
                  listItem: 'a',
                  data: {
                    href: {
                      attr: 'href',
                    },
                    name: {},
                  },
                },
              },
            },
          },
        },
      },
    },
  }).then(transform)

  function transform({
    data: { regionNames, regions },
  }: scrapeIt.ScrapeResult<RoutesData>): Routes {
    return {
      regions: regions
        .filter(({ from }) => from.length > 0)
        .map(({ from }, i) => ({
          name: regionNames[i],
          from: from
            .filter(({ to: { routes } }) => routes.length > 0)
            .map(({ name, to: { routes } }) => {
              const [code] = routeCodesFromUrl(routes[0].href)

              return {
                name,
                code,
                to: routes.map(({ name, href }) => {
                  const urlPath = href.replace(baseUrl, '')
                  const codes = routeCodesFromUrl(urlPath)
                  const special = urlPath.startsWith(
                    '/routes-fares/schedules/seasonal',
                  )
                    ? undefined
                    : true
                  const code = special ? codes.join('-') : codes[1]

                  return special
                    ? {
                        name,
                        code,
                        urlPath,
                        special,
                      }
                    : {
                        name,
                        code,
                        urlPath,
                      }
                }),
              }
            }),
        })),
    }
  }

  function routeCodesFromUrl(urlPath: string) {
    const routeCodePair = urlPath.split('/').at(-1)
    if (!routeCodePair) throw new Error(`Invalid route URL path: ${urlPath}`)

    const routeCodes = routeCodePair.split('-')
    if (routeCodes.length !== 2) {
      throw new Error(`Invalid route code: ${routeCodePair}`)
    }

    return routeCodes
  }
}
