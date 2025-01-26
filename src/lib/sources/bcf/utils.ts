import dayjs from 'dayjs'
import { tz } from './config'

const timeFormats = ['HH:mm', 'hh:mmA', 'h:mmA']
const dateFormats = ['YYYY-MM-DD', 'MM/DD/YYYY', 'M/D/YYYY']
const timestampFormats = [
  'YYYY-MM-DDTHH:mm:ss.SSSZ',
  'YYYY-MM-DD HH:mm:ss.SSSZ',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DD HH:mm:ss.SSS',
]

export function parseTime(value: string) {
  value = value.replace(/am/, 'AM').replace(/pm/, 'PM')

  let timestamp: dayjs.Dayjs

  timestamp = dayjs(value, timeFormats, true).tz(tz)
  if (timestamp.isValid()) return timestamp

  throw new Error(`Invalid time format: ${value}`)
}

export function parseDate(value: string) {
  let timestamp: dayjs.Dayjs

  timestamp = dayjs(value, dateFormats, true).tz(tz)
  if (timestamp.isValid()) return timestamp

  throw new Error(`Invalid date format: ${value}`)
}

export function parseTimestamp(value: string) {
  let timestamp: dayjs.Dayjs

  timestamp = dayjs(value, timestampFormats).tz(tz)
  if (timestamp.isValid()) return timestamp

  throw new Error(`Invalid timestamp format: ${value}`)
}

export function buildTimestamp(time: string, date?: string) {
  const timePart = parseTime(time).format('HH:mm:ss.SSS')
  const datePart = (date ? parseDate(date) : dayjs()).format('YYYY-MM-DD')

  return parseTimestamp([datePart, timePart].join(' '))
}
