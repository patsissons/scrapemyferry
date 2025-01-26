import scrapeIt from 'scrape-it'
import type { SeasonalSchedule } from '../types'
import { seasonalScheduleUrl } from './urls'

interface SeasonalScheduleData {
  seasonalSchedule: {
    days: { day: string }[]
    daySchedules: {
      schedules: {
        depart: string
        arrive: string
        duration: string
        messages: { message: string }[]
      }[]
    }[]
  }
}

export function seasonalSchedule(from: string, to: string) {
  return scrapeIt<SeasonalScheduleData>(seasonalScheduleUrl(from, to), {
    seasonalSchedule: {
      selector: '#seasonalSchedulesForm table.table-seasonal-schedule',
      eq: 0,
      data: {
        days: {
          listItem: 'thead',
          data: {
            day: {
              selector: 'tr',
              attr: 'data-schedule-day',
            },
          },
        },
        daySchedules: {
          listItem: 'tbody',
          data: {
            schedules: {
              listItem: 'tr',
              data: {
                depart: {
                  selector: 'td > span',
                  eq: 0,
                },
                arrive: {
                  selector: 'td',
                  eq: 2,
                },
                duration: {
                  selector: 'td',
                  eq: 3,
                },
                messages: {
                  listItem: 'td:nth-child(2) > p',
                  convert: (message) =>
                    typeof message === 'string' ? message : '',
                },
              },
            },
          },
        },
      },
    },
  }).then(transform)

  function transform({
    data: {
      seasonalSchedule: { days, daySchedules },
    },
  }: scrapeIt.ScrapeResult<SeasonalScheduleData>): SeasonalSchedule {
    return {
      days: daySchedules
        .filter(
          ({ schedules }) =>
            schedules.length > 0 &&
            schedules.some(({ depart, arrive }) => depart && arrive),
        )
        .map(({ schedules }, index) => ({
          day: days[index].day,
          sailings: schedules
            .filter(({ depart, arrive }) => depart && arrive)
            .map(({ messages, ...schedule }) => ({
              ...schedule,
              messages: messages
                .filter(({ message }) => message?.trim())
                .map(({ message }) => message.trim()),
            })),
        })),
    }
  }
}
