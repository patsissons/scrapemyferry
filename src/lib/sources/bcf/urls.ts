const baseUrl = 'https://www.bcferries.com'

export function bcFerriesUrl(
  type: string,
  path: string,
  params?: Record<string, string>,
) {
  const url = [baseUrl, type, path].filter(Boolean).join('/')
  return params ? `${url}?${new URLSearchParams(params).toString()}` : url
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
    departureTime,
    routeCode: [from, to].join('-'),
  })
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

    return {
      scheduleDate: new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    }
  }
}

export function seasonalScheduleUrl(from: string, to: string) {
  return bcFerriesRouteUrl('routes-fares/schedules/seasonal', from, to)
}
