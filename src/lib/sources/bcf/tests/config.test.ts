import { baseUrl, config, tz } from '../config'

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
        tz,
      })
    })
  })

  describe('tz', () => {
    it('should be the correct timezone', () => {
      expect(tz).toBe('America/Vancouver')
    })
  })
})
