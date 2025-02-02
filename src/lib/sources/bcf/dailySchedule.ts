import scrapeIt from 'scrape-it'
import type { DailySchedule } from '../types'
import { dailyScheduleUrl } from './urls'

interface DailyScheduleData {
  dailySchedule: {
    depart: string
    arrive: string
    duration: string
    type: string
  }[]
}

export function dailySchedule(from: string, to: string, date?: string) {
  const url = dailyScheduleUrl(from, to, date)
  return scrapeIt<DailyScheduleData>(url, {
    dailySchedule: {
      listItem: '#dailyScheduleTableOnward > tbody > tr',
      data: {
        depart: {
          selector: 'td',
          eq: 1,
          convert: (depart) => depart.toUpperCase(),
        },
        arrive: {
          selector: 'td',
          eq: 2,
          convert: (arrive) => arrive.toUpperCase(),
        },
        duration: {
          selector: 'td',
          eq: 3,
        },
        type: {
          selector: 'td',
          eq: 4,
        },
      },
    },
  }).then(transform)

  function transform({
    data: { dailySchedule },
  }: scrapeIt.ScrapeResult<DailyScheduleData>): DailySchedule {
    return {
      url,
      sailings: dailySchedule.filter(({ depart, arrive }) => depart && arrive),
    }
  }
}
