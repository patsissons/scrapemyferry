import scrapeIt from 'scrape-it'
import type { CurrentConditions } from '../types'
import { currentConditionsUrl } from './urls'

type CurrentConditionsData = Omit<CurrentConditions, 'url' | 'nextSailing'> & {
  nextSailing: {
    scheduled: string
    totalSpace: string
  }
}

export function currentConditions(from: string, to: string) {
  const url = currentConditionsUrl(from, to)
  return scrapeIt<CurrentConditionsData>(url, {
    lastUpdated: {
      selector: '#tabs-1 i.cc-last-update-text',
      convert: (text) =>
        text
          .replace('Refresh details', '')
          .replace('Last updated:', '')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .toUpperCase(),
    },
    nextSailing: {
      selector: '.current-condition-sailing-detail',
      data: {
        scheduled: {
          selector: '.now-ticketing-departure-info p',
          convert: (scheduled) => scheduled.toUpperCase(),
        },
        totalSpace: {
          selector: '.now-ticketing-estimated-space-info > span',
        },
      },
    },
    trackingMap: {
      selector: '#tabs-2 img',
      attr: 'src',
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
              convert: (scheduled) => scheduled.toUpperCase(),
            },
            actual: {
              selector: 'p > span',
              eq: 1,
              convert: (text) =>
                text.replace('Departed', '').trim().toUpperCase(),
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
    data: { departures, nextSailing, ...data },
  }: scrapeIt.ScrapeResult<CurrentConditionsData>): CurrentConditions {
    return {
      url,
      ...data,
      nextSailing: {
        ...nextSailing,
        totalSpace: parseInt(nextSailing.totalSpace.replace('%', '')) / 100,
      },
      departures: departures.filter(
        ({ departure: { scheduled } }) => scheduled,
      ),
    }
  }
}
