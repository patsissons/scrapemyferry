import scrapeIt from 'scrape-it'
import type { SeasonalSchedule } from '../types'
import { seasonalScheduleUrl } from './urls'

interface SeasonalScheduleData {
  seasonalSchedule: {
    days: { day: string }[]
    schedules: {
      schedule: {
        depart: string
        arrive: string
        duration: string
        messages: { message: string }[]
      }
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
        schedules: {
          listItem: 'tbody',
          data: {
            schedule: {
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
      seasonalSchedule: { days, schedules },
    },
  }: scrapeIt.ScrapeResult<SeasonalScheduleData>) {
    // return {
    //   days: schedules
    //   .filter(({depart, arrive}) => depart && arrive)
    //   .map(({ schedule: {messages, ...sailing} }, index) => {
    //     return {
    //       day: days[index].day,
    //       sailings: {
    //         ...sailing,
    //         messages,
    //       }
    //     }
    //   }),
    // } as SeasonalSchedule

    return {
      days: [],
    } as SeasonalSchedule

    // const seasonalSchedule = data.seasonalSchedule.schedules.map(
    //   (item, index) => {
    //     return {
    //       day: data.seasonalSchedule.days[index].day,
    //       schedule: item.schedule
    //         .filter((item) => item.depart && item.arrive)
    //         .map(({ messages = [], ...row }) => {
    //           return {
    //             ...row,
    //             messages: messages.filter(Boolean),
    //           }
    //         }),
    //     }
    //   },
    // )

    // return seasonalSchedule[0].schedule
  }
}
