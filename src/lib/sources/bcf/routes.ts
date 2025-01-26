import scrapeIt from 'scrape-it'
import type { Routes } from '../types'
import { routesUrl } from './urls'

export function routes() {
  return scrapeIt<Routes>(routesUrl(), {
    body: {},
  }).then(transform)

  function transform({ data }: scrapeIt.ScrapeResult<Routes>) {
    return data as Routes
  }
}
