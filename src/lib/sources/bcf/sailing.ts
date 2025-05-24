import dayjs from 'dayjs'
import scrapeIt from 'scrape-it'
import type { Sailing } from '../types'
import { availabilityUrl } from './urls'
import { buildTimestamp, parsePercentage, parseTime } from './utils'
import { tz } from './config'

interface SailingData {
  body: {
    time: string
    totalSpace: string
    standardSpace: string
    mixedSpace: string
  }
}

export function sailing(
  from: string,
  to: string,
  departureTime: string,
  departureDate?: string,
) {
  const departTimestamp = buildTimestamp(departureTime, departureDate)
  const url = availabilityUrl(from, to, departTimestamp)

  return scrapeIt<SailingData>(url, {
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

  function transform({
    data: {
      body: { time, totalSpace, standardSpace, mixedSpace },
    },
  }: scrapeIt.ScrapeResult<SailingData>): Sailing {
    const [total, standard, mixed] = [
      totalSpace,
      standardSpace,
      mixedSpace,
    ].map(parsePercentage)
    const [datePart] = departTimestamp.split(' ')
    const isotime = dayjs(
      [datePart, parseTime(time)].join(' '),
      'YYYY-MM-DD HH:mm',
      true,
    )
      .tz(tz)
      .toISOString()

    return {
      url,
      time: isotime,
      space: {
        total,
        standard,
        mixed,
      },
    }
  }
}
