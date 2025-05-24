import dayjs from 'dayjs'
import { baseUrl } from './config'
import { parseTimestamp } from './utils'

export { baseUrl }

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
    departureTime: formatDepartureTime(),
    routeCode: [from, to].join('-'),
  })

  function formatDepartureTime() {
    return parseTimestamp(departureTime + ':00.000').replace(' ', '%20') + ':00'
  }
}

export function currentConditionsUrl(from: string, to: string) {
  return bcFerriesRouteUrl('current-conditions', from, to)
}

export function currentConditionsBetaUrl(from: string, to: string) {
  return bcFerriesRouteUrl('current-conditions-beta', from, to)
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
    formatDate(),
  )

  function formatDate() {
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
