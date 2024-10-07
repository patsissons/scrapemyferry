import scrapeIt from 'scrape-it'

const baseUrl = 'https://www.bcferries.com'

function bcFerriesUrl(
  type: string,
  path: string,
  params?: Record<string, string>,
) {
  const url = [baseUrl, type, path].filter(Boolean).join('/')
  return params ? `${url}?${new URLSearchParams(params).toString()}` : url
}

function bcFerriesRouteUrl(
  type: string,
  from: string,
  to: string,
  params?: Record<string, string>,
) {
  return bcFerriesUrl(type, [from, to].join('-'), params)
}

function availabilityUrl(from: string, to: string, departureTime: string) {
  return bcFerriesUrl('sailing-availability', '', {
    departureTime,
    routeCode: [from, to].join('-'),
  })
}

function currentConditionsUrl(from: string, to: string) {
  return bcFerriesRouteUrl('current-conditions', from, to)
}

// function departuresUrl(from: string) {
//   return bcFerriesUrl('current-conditions', 'departures', {
//     terminalCode: from,
//   })
// }

function dailyScheduleUrl(from: string, to: string, date?: Date) {
  return bcFerriesRouteUrl(
    'routes-fares/schedules/daily',
    from,
    to,
    date
      ? {
          scheduleDate: date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }),
        }
      : undefined,
  )
}

function seasonalScheduleUrl(from: string, to: string) {
  return bcFerriesRouteUrl('routes-fares/schedules/seasonal', from, to)
}

interface Availability {
  time: string
  totalSpace: string
  standardSpace: string
  mixedSpace: string
}

export function availability(from: string, to: string, departureTime: string) {
  return scrapeIt<Availability>(availabilityUrl(from, to, departureTime), {
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

  function transform({ data }: scrapeIt.ScrapeResult<Availability>) {
    return data
  }
}

interface CurrentConditions {
  lastUpdated: string
  departures: {
    departure: {
      scheduled: string
      actual: string
      vessel: string
    }
    status: string
  }[]
  webcams: { url: string }[]
  terminal: {
    name: string
    address: string
  }
}

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
      listItem: '.webcam-wrapper img',
      data: {
        url: {
          attr: 'src',
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

  function transform({ data }: scrapeIt.ScrapeResult<CurrentConditions>) {
    return {
      ...data,
      departures: data.departures.filter(
        ({ departure }) => departure.scheduled,
      ),
      webcams: data.webcams.map(({ url }) => url),
    }
  }
}

interface DailyScheduleItem {
  depart: string
  arrive: string
  duration: string
}

interface SeasonalScheduleItem extends DailyScheduleItem {
  messages: { message: string }[]
}

interface DailySchedule {
  dailySchedule: DailyScheduleItem[]
}

interface SeasonalSchedule {
  seasonalSchedule: {
    days: { day: string }[]
    schedules: {
      schedule: SeasonalScheduleItem[]
    }[]
  }
}

export function dailySchedule(from: string, to: string, date?: Date) {
  return scrapeIt<DailySchedule>(dailyScheduleUrl(from, to, date), {
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

  function transform({ data }: scrapeIt.ScrapeResult<DailySchedule>) {
    const dailySchedule = data.dailySchedule
      .filter((item) => item.depart && item.arrive)
      .map((item) => {
        const depart = new Date(item.depart)

        return {
          ...item,
          depart,
        }
      })

    return dailySchedule
  }
}

export function seasonalSchedule(from: string, to: string) {
  return scrapeIt<SeasonalSchedule>(seasonalScheduleUrl(from, to), {
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

  function transform({ data }: scrapeIt.ScrapeResult<SeasonalSchedule>) {
    const seasonalSchedule = data.seasonalSchedule.schedules.map(
      (item, index) => {
        return {
          day: data.seasonalSchedule.days[index].day,
          schedule: item.schedule
            .filter((item) => item.depart && item.arrive)
            .map(({ messages = [], ...row }) => {
              return {
                ...row,
                messages: messages.filter(Boolean),
              }
            }),
        }
      },
    )

    return seasonalSchedule[0].schedule
  }
}
