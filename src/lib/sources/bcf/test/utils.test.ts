import dayjs from 'dayjs'
import { tz } from '../config'
import { parseTime, parseDate, parseTimestamp, buildTimestamp } from '../utils'

describe('utils', () => {
  const tzNow = dayjs().tz(tz)
  const nowDate = tzNow.format('YYYY-MM-DD')
  const tzOffset = tzNow.format('Z')

  function isoTimestamp(time: string, date = nowDate) {
    return `${date}T${time}${tzOffset}`
  }

  function isoDate(date: string) {
    return isoTimestamp('00:00:00', date)
  }

  describe('parseTime', () => {
    it('parses HH:mm', () => {
      expect(parseTime('12:34').format()).toBe(isoTimestamp('12:34:00'))
      expect(parseTime('14:34').format()).toBe(isoTimestamp('14:34:00'))
      expect(parseTime('02:34').format()).toBe(isoTimestamp('02:34:00'))
    })

    it('parses hh:mmA', () => {
      expect(parseTime('12:34AM').format()).toBe(isoTimestamp('00:34:00'))
      expect(parseTime('04:34PM').format()).toBe(isoTimestamp('16:34:00'))
      expect(parseTime('02:34PM').format()).toBe(isoTimestamp('14:34:00'))
    })

    it('parses h:mmA', () => {
      expect(parseTime('12:34AM').format()).toBe(isoTimestamp('00:34:00'))
      expect(parseTime('4:34PM').format()).toBe(isoTimestamp('16:34:00'))
      expect(parseTime('2:34PM').format()).toBe(isoTimestamp('14:34:00'))
    })

    it('normalizes AM/PM to uppercase', () => {
      expect(parseTime('12:34am').format()).toBe(isoTimestamp('00:34:00'))
      expect(parseTime('4:34pm').format()).toBe(isoTimestamp('16:34:00'))
      expect(parseTime('2:34pm').format()).toBe(isoTimestamp('14:34:00'))
    })
  })

  describe('parseDate', () => {
    it('parses YYYY-MM-DD', () => {
      expect(parseDate('2025-01-01').format()).toBe(isoDate('2025-01-01'))
    })

    it('parses MM/DD/YYYY', () => {
      expect(parseDate('01/01/2025').format()).toBe(isoDate('2025-01-01'))
    })

    it('parses M/D/YYYY', () => {
      expect(parseDate('1/1/2025').format()).toBe(isoDate('2025-01-01'))
    })
  })

  describe('parseTimestamp', () => {
    it('parses YYYY-MM-DDTHH:mm:ss.SSSZ', () => {
      expect(parseTimestamp('2025-01-01T12:34:56.000Z').format()).toBe(
        isoTimestamp('04:34:56', '2025-01-01'),
      )
    })

    it('parses YYYY-MM-DDTHH:mm:ss.SSS', () => {
      expect(parseTimestamp('2025-01-01T12:34:56.000').format()).toBe(
        isoTimestamp('12:34:56', '2025-01-01'),
      )
    })

    it('parses YYYY-MM-DD HH:mm:ss.SSSZ', () => {
      expect(parseTimestamp('2025-01-01 12:34:56.000Z').format()).toBe(
        isoTimestamp('04:34:56', '2025-01-01'),
      )
    })

    it('parses YYYY-MM-DD HH:mm:ss.SSS', () => {
      expect(parseTimestamp('2025-01-01 12:34:56.000').format()).toBe(
        isoTimestamp('12:34:56', '2025-01-01'),
      )
    })

    it('can round trip with ISO 8601', () => {
      const timestamp = dayjs().toISOString()
      expect(parseTimestamp(timestamp).toISOString()).toBe(timestamp)
    })
  })

  describe('buildTimestamp', () => {
    it('builds a timestamp for the current date', () => {
      expect(buildTimestamp('12:34').format()).toBe(isoTimestamp('12:34:00'))
    })

    it('builds a timestamp for a specific date', () => {
      expect(buildTimestamp('12:34', '2025-01-01').format()).toBe(
        isoTimestamp('12:34:00', '2025-01-01'),
      )
    })
  })
})
