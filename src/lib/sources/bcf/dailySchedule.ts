import scrapeIt from 'scrape-it'
import type { DailySchedule } from '../types'
import { dailyScheduleUrl } from './urls'

interface DailyScheduleData {
  dailySchedule: {
    depart: string
    arrive: string
    duration: string
  }[]
}

export function dailySchedule(from: string, to: string, date?: string) {
  return scrapeIt<DailyScheduleData>(dailyScheduleUrl(from, to, date), {
    dailySchedule: {
      listItem: '#dailyScheduleTableOnward > tbody > tr',
      data: {
        depart: {
          selector: 'td',
          eq: 1,
          attr: 'data-sort',
        },
        arrive: {
          selector: 'td',
          eq: 2,
        },
        duration: {
          selector: 'td',
          eq: 3,
        },
      },
    },
  }).then(transform)

  function transform({
    data: { dailySchedule },
  }: scrapeIt.ScrapeResult<DailyScheduleData>): DailySchedule {
    return {
      sailings: dailySchedule.filter(({ depart, arrive }) => depart && arrive),
    }
  }
}
