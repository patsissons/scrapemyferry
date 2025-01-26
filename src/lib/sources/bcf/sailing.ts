import dayjs from 'dayjs'
import scrapeIt from 'scrape-it'
import type { Sailing } from '../types'
import { availabilityUrl } from './urls'
import { buildTimestamp } from './utils'
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

  return scrapeIt<SailingData>(
    availabilityUrl(from, to, departTimestamp.toISOString()),
    {
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
    },
  ).then(transform)

  function transform({
    data: {
      body: { time, totalSpace, standardSpace, mixedSpace },
    },
  }: scrapeIt.ScrapeResult<SailingData>): Sailing {
    const [total, standard, mixed] = [
      totalSpace,
      standardSpace,
      mixedSpace,
    ].map((space) => parseInt(space.replace('%', '')) / 100)
    const isotime = dayjs(
      departTimestamp.format('YYYY-MM-DD') +
        ' ' +
        dayjs(time, 'h:mma').format('HH:mm:ss'),
      'YYYY-MM-DD HH:mm:ss',
      true,
    )
      .tz(tz)
      .toISOString()

    return {
      time: isotime,
      space: {
        total,
        standard,
        mixed,
      },
    }
  }
}
