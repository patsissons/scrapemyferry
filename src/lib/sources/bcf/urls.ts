import dayjs from 'dayjs'

export const baseUrl = 'https://www.bcferries.com'

export function bcFerriesUrl(
  type: string,
  path: string,
  params?: Record<string, string>,
) {
  const url = [baseUrl, type, path].filter(Boolean).join('/')
  return params
    ? `${url}?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : url
}

export function bcFerriesRouteUrl(
  type: string,
  from: string,
  to: string,
  params?: Record<string, string>,
) {
  return bcFerriesUrl(type, [from, to].join('-'), params)
}

export function routesUrl() {
  return bcFerriesUrl('routes-fares', 'schedules')
}

export function availabilityUrl(
  from: string,
  to: string,
  departureTime: string,
) {
  return bcFerriesUrl('sailing-availability', '', {
    departureTime: formatDepartureTime(departureTime),
    routeCode: [from, to].join('-'),
  })

  function formatDepartureTime(time: string) {
    return parseTime().format('YYYY-MM-DD HH:mm:ss').replace(' ', '%20')

    function parseTime() {
      let timestamp = dayjs(time)
      if (timestamp.isValid()) return timestamp

      timestamp = dayjs(time, 'HH:mm')
      if (timestamp.isValid()) return timestamp

      timestamp = dayjs(time, 'HH:mm:ss')
      if (timestamp.isValid()) return timestamp

      throw new Error(`Invalid departure time format: ${time}`)
    }
  }
}

export function currentConditionsUrl(from: string, to: string) {
  return bcFerriesRouteUrl('current-conditions', from, to)
}

export function departuresUrl(from: string) {
  return bcFerriesUrl('current-conditions', 'departures', {
    terminalCode: from,
  })
}

export function dailyScheduleUrl(from: string, to: string, date?: string) {
  return bcFerriesRouteUrl(
    'routes-fares/schedules/daily',
    from,
    to,
    formatDate(date),
  )

  function formatDate(date?: string) {
    if (!date) return

    const timestamp = dayjs(date)
    if (!timestamp.isValid()) throw new Error(`Invalid date format: ${date}`)

    return {
      scheduleDate: timestamp.format('MM/DD/YYYY'),
    }
  }
}

export function seasonalScheduleUrl(from: string, to: string) {
  return bcFerriesRouteUrl('routes-fares/schedules/seasonal', from, to)
}
