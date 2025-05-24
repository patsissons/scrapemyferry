import dayjs from 'dayjs'
import { baseUrl, tz } from './config'

const timeFormats = ['HH:mm', 'hh:mmA', 'h:mmA', 'hh:mm A', 'h:mm A']
const dateFormats = ['YYYY-MM-DD', 'MM/DD/YYYY', 'M/D/YYYY']
const timestampFormats = [
  'YYYY-MM-DDTHH:mm:ss.SSSZ',
  'YYYY-MM-DD HH:mm:ss.SSSZ',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DD HH:mm:ss.SSS',
]

/**
 * Parses a time string into HH:mm format.
 */
export function parseTime(value: string) {
  value = value.replace(/am/, 'AM').replace(/pm/, 'PM')

  let timestamp: dayjs.Dayjs

  timestamp = dayjs(value, timeFormats, true)
  if (timestamp.isValid()) return timestamp.format('HH:mm')

  throw new Error(`Invalid time format: ${value}`)
}

/**
 * Parses a date string into YYYY-MM-DD format.
 */
export function parseDate(value: string) {
  let timestamp: dayjs.Dayjs

  timestamp = dayjs(value, dateFormats, true)
  if (timestamp.isValid()) return timestamp.format('YYYY-MM-DD')

  throw new Error(`Invalid date format: ${value}`)
}

/**
 * Parses a timestamp string into YYYY-MM-DD HH:mm format.
 */
export function parseTimestamp(value: string) {
  let timestamp: dayjs.Dayjs

  timestamp = dayjs(value, timestampFormats)
  if (timestamp.isValid()) return timestamp.format('YYYY-MM-DD HH:mm')

  throw new Error(`Invalid timestamp format: ${value}`)
}

/**
 * Builds a timestamp string from a time and date into YYYY-MM-DD HH:mm format.
 */
export function buildTimestamp(time: string, date?: string) {
  const timePart = parseTime(time) + ':00.000'
  const datePart = date ? parseDate(date) : dayjs().format('YYYY-MM-DD')

  return parseTimestamp([datePart, timePart].join(' '))
}

export function parsePercentage(value: string) {
  const trimmed = value.trim()
  if (trimmed.toLowerCase() === 'full') return 1

  return parseInt(trimmed.replace('%', '').trim()) / 100
}

export function parseUrlPath(path: string) {
  return `${baseUrl}${path}`
}
