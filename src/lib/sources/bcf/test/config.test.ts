import { baseUrl, bookingPath, config, tz, tzOffset } from '../config'

describe('BCF Config', () => {
  describe('baseUrl', () => {
    it('should be the correct base URL', () => {
      expect(baseUrl).toBe('https://www.bcferries.com')
    })
  })

  describe('config', () => {
    it('should be the correct config', () => {
      expect(config).toStrictEqual({
        baseUrl,
        bookingPath,
        tz,
        tzOffset,
      })
    })
  })

  describe('tz', () => {
    it('should be the correct timezone', () => {
      expect(tz).toBe('America/Vancouver')
    })
  })

  describe('tzOffset', () => {
    it('should be the correct timezone offset', () => {
      expect(tzOffset).toBe('-07:00')
    })
  })
})
