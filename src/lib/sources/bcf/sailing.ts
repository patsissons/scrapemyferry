import scrapeIt from 'scrape-it'
import type { Sailing } from '../types'
import { availabilityUrl } from './urls'

export function sailing(from: string, to: string, departureTime: string) {
  return scrapeIt<Sailing>(availabilityUrl(from, to, departureTime), {
    body: {
      selector: '.modal-body',
      data: {
        time: {
          selector: '.modal-time > span',
          eq: 0,
        },
        totalSpace: {
          selector: '.standard-vehicle-space > p > span',
          eq: 0,
        },
        standardSpace: {
          selector: '.standard-vehicle-space > p > span',
          eq: 2,
        },
        mixedSpace: {
          selector: '.mixed-vehicle-space > p > span',
          eq: 1,
        },
      },
    },
  }).then(transform)

  function transform({ data }: scrapeIt.ScrapeResult<Sailing>) {
    return data as Sailing
  }
}
