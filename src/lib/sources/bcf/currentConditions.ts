import scrapeIt from 'scrape-it'
import type { CurrentConditions } from '../types'
import { currentConditionsUrl } from './urls'

export function currentConditions(from: string, to: string) {
  return scrapeIt<CurrentConditions>(currentConditionsUrl(from, to), {
    lastUpdated: {
      selector: '#tabs-1 i.cc-last-update-text',
      convert: (text) =>
        text
          .replace('Refresh details', '')
          .replace('Last updated:', '')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
    },
    departures: {
      listItem: '#tabs-1 table.detail-departure-table > tbody > tr',
      data: {
        departure: {
          selector: 'td',
          eq: 0,
          data: {
            scheduled: {
              selector: 'p > span',
              eq: 0,
            },
            actual: {
              selector: 'p > span',
              eq: 1,
              convert: (text) => text.replace('Departed', '').trim(),
            },
            vessel: {
              selector: 'p > a',
              data: {
                name: {},
                url: {
                  attr: 'href',
                },
              },
            },
          },
        },
        status: {
          selector: 'td > div',
          convert: (text) =>
            text
              .replace(/\n/g, ' ')
              .replace(/\s+/g, ' ')
              .replace('ETA :', 'ETA:')
              .trim(),
        },
      },
    },
    webcams: {
      listItem: '.webcam-wrapper > .row > div',
      data: {
        url: {
          selector: 'img',
          attr: 'src',
        },
        label: {
          selector: 'p',
        },
      },
    },
    terminal: {
      selector: '#terminalDetails',
      data: {
        name: {
          selector: 'h4',
        },
        address: {
          selector: 'p',
          eq: 0,
        },
      },
    },
  }).then(transform)

  function transform({
    data: { departures, ...data },
  }: scrapeIt.ScrapeResult<CurrentConditions>) {
    return {
      ...data,
      departures: departures.filter(
        ({ departure: { scheduled } }) => scheduled,
      ),
    } as CurrentConditions
  }
}
