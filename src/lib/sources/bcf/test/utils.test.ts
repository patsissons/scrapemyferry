import dayjs from 'dayjs'
import { tz } from '../config'
import {
  parseTime,
  parseDate,
  parseTimestamp,
  buildTimestamp,
  parsePercentage,
  parseUrlPath,
} from '../utils'

describe('utils', () => {
  const tzNow = dayjs().tz(tz)
  const nowDate = tzNow.format('YYYY-MM-DD')

  describe('parseTime', () => {
    it('parses HH:mm', () => {
      expect(parseTime('12:34')).toBe('12:34')
      expect(parseTime('14:34')).toBe('14:34')
      expect(parseTime('02:34')).toBe('02:34')
    })

    it('parses hh:mmA', () => {
      expect(parseTime('12:34AM')).toBe('00:34')
      expect(parseTime('04:34PM')).toBe('16:34')
      expect(parseTime('02:34PM')).toBe('14:34')
    })

    it('parses h:mmA', () => {
      expect(parseTime('12:34AM')).toBe('00:34')
      expect(parseTime('4:34PM')).toBe('16:34')
      expect(parseTime('2:34PM')).toBe('14:34')
    })

    it('parses hh:mm A', () => {
      expect(parseTime('12:34 AM')).toBe('00:34')
      expect(parseTime('04:34 PM')).toBe('16:34')
      expect(parseTime('02:34 PM')).toBe('14:34')
    })

    it('parses h:mm A', () => {
      expect(parseTime('12:34 AM')).toBe('00:34')
      expect(parseTime('4:34 PM')).toBe('16:34')
      expect(parseTime('2:34 PM')).toBe('14:34')
    })

    it('normalizes AM/PM to uppercase', () => {
      expect(parseTime('12:34am')).toBe('00:34')
      expect(parseTime('4:34pm')).toBe('16:34')
      expect(parseTime('2:34pm')).toBe('14:34')
    })
  })

  describe('parseDate', () => {
    it('parses YYYY-MM-DD', () => {
      expect(parseDate('2025-01-01')).toBe('2025-01-01')
    })

    it('parses MM/DD/YYYY', () => {
      expect(parseDate('01/01/2025')).toBe('2025-01-01')
    })

    it('parses M/D/YYYY', () => {
      expect(parseDate('1/1/2025')).toBe('2025-01-01')
    })
  })

  describe('parseTimestamp', () => {
    it('parses YYYY-MM-DDTHH:mm:ss.SSSZ', () => {
      expect(parseTimestamp('2025-01-01T12:34:56.000Z')).toMatch(
        /2025-01-01 \d\d:34/,
      )
    })

    it('parses YYYY-MM-DDTHH:mm:ss.SSS', () => {
      expect(parseTimestamp('2025-01-01T12:34:56.000')).toBe('2025-01-01 12:34')
    })

    it('parses YYYY-MM-DD HH:mm:ss.SSSZ', () => {
      expect(parseTimestamp('2025-01-01 12:34:56.000Z')).toMatch(
        /2025-01-01 \d\d:34/,
      )
    })

    it('parses YYYY-MM-DD HH:mm:ss.SSS', () => {
      expect(parseTimestamp('2025-01-01 12:34:56.000')).toBe('2025-01-01 12:34')
    })
  })

  describe('buildTimestamp', () => {
    it('builds a timestamp for the current date', () => {
      expect(buildTimestamp('12:34')).toBe(`${nowDate} 12:34`)
    })

    it('builds a timestamp for a specific date', () => {
      expect(buildTimestamp('12:34', '2025-01-01')).toBe('2025-01-01 12:34')
    })
  })

  describe('parsePercentage', () => {
    it('parses Full', () => {
      expect(parsePercentage('Full')).toBe(1)
    })

    it('parses 23%', () => {
      expect(parsePercentage('23%')).toBe(0.23)
    })
  })

  describe('parseUrlPath', () => {
    it('parses a relative path', () => {
      expect(parseUrlPath('/booking/HSB-LNG')).toBe(
        'https://www.bcferries.com/booking/HSB-LNG',
      )
    })
  })
})
