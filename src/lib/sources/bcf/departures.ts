import scrapeIt from 'scrape-it'
import type { Departures } from '../types'
import { departuresUrl } from './urls'

type DeparturesData = Omit<Departures, 'url'>

export function departures(from: string) {
  const url = departuresUrl(from)
  return scrapeIt<DeparturesData>(url, {
    name: {
      selector: '#terminalInfo > h3',
      convert: (name) => name.replace(/terminal$/im, '').trim(),
    },
    terminals: {
      listItem: 'table.departures-tbl > tbody',
      data: {
        name: {
          selector: 'tr > td > p',
          eq: 0,
          convert: (name) => name.replace(/^.* -/gm, '').trim(),
        },
        duration: {
          selector: 'tr > td > p.sailing-time',
          eq: 0,
          convert: (duration) =>
            duration.replace(/^.*:/gm, '').replace(/\s+/gm, ' ').trim(),
        },
        departures: {
          listItem: 'tr.padding-departures-td',
          data: {
            vessel: {
              selector: 'td',
              eq: 0,
              data: {
                name: {},
                url: {
                  selector: 'a',
                  attr: 'href',
                },
              },
            },
            times: {
              selector: 'td',
              eq: 1,
              data: {
                scheduled: {
                  selector: 'ul',
                  eq: 0,
                  convert: (scheduled) =>
                    scheduled
                      .replace(/^scheduled:/im, '')
                      .trim()
                      .toUpperCase(),
                },
                actual: {
                  selector: 'ul',
                  eq: 1,
                  convert: (actual) =>
                    actual
                      .replace(/^actual:/im, '')
                      .trim()
                      .toUpperCase(),
                },
                arrival: {
                  selector: 'ul',
                  eq: 2,
                  convert: (arrival) =>
                    arrival
                      .replace(/^(arrival|eta):/im, '')
                      .trim()
                      .toUpperCase(),
                },
                arrivalIsEta: {
                  selector: 'ul',
                  eq: 2,
                  convert: (arrivalIsEta) => arrivalIsEta.startsWith('ETA:'),
                },
              },
            },
            status: {
              selector: 'td',
              eq: 2,
            },
          },
        },
      },
    },
  }).then(transform)

  function transform({
    data: { terminals, ...data },
  }: scrapeIt.ScrapeResult<DeparturesData>): Departures {
    return {
      url,
      ...data,
      terminals: terminals.map(({ departures, ...terminal }) => ({
        ...terminal,
        departures: departures.map(
          ({ times: { arrivalIsEta, ...times }, ...departure }) => ({
            ...departure,
            times: arrivalIsEta ? { ...times, arrivalIsEta } : times,
          }),
        ),
      })),
    }
  }
}
