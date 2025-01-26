import dayjs from 'dayjs'
import {
  baseUrl,
  bcFerriesUrl,
  bcFerriesRouteUrl,
  routesUrl,
  availabilityUrl,
  currentConditionsUrl,
  departuresUrl,
  dailyScheduleUrl,
  seasonalScheduleUrl,
} from '../urls'

describe('BCF URLs', () => {
  describe('baseUrl', () => {
    it('should be the correct base URL', () => {
      expect(baseUrl).toBe('https://www.bcferries.com')
    })
  })

  describe('bcFerriesUrl', () => {
    it('should create a basic URL without params', () => {
      expect(bcFerriesUrl('test', 'path')).toBe(`${baseUrl}/test/path`)
    })

    it('should create a URL with params', () => {
      expect(bcFerriesUrl('test', 'path', { key: 'value' })).toBe(
        `${baseUrl}/test/path?key=value`,
      )
    })
  })

  describe('bcFerriesRouteUrl', () => {
    it('should create a route URL', () => {
      expect(bcFerriesRouteUrl('test', 'HSB', 'LNG')).toBe(
        `${baseUrl}/test/HSB-LNG`,
      )
    })

    it('should create a route URL with params', () => {
      expect(bcFerriesRouteUrl('test', 'HSB', 'LNG', { key: 'value' })).toBe(
        `${baseUrl}/test/HSB-LNG?key=value`,
      )
    })
  })

  describe('routesUrl', () => {
    it('should return the route fares schedules URL', () => {
      expect(routesUrl()).toBe(`${baseUrl}/routes-fares/schedules`)
    })
  })

  describe('availabilityUrl', () => {
    it('should return the sailing availability URL for the provided route and departure timestamp', () => {
      const timestamp = dayjs('2025-01-01 14:10:00', 'YYYY-MM-DD HH:mm:ss')
      expect(availabilityUrl('HSB', 'LNG', timestamp.toISOString())).toBe(
        `${baseUrl}/sailing-availability?departureTime=2025-01-01%2014:10:00&routeCode=HSB-LNG`,
      )
    })

    it('should return the sailing availability URL for the provided route and departure time', () => {
      const currentDate = dayjs().format('YYYY-MM-DD')
      expect(availabilityUrl('HSB', 'LNG', `${currentDate} 14:10:00.000`)).toBe(
        `${baseUrl}/sailing-availability?departureTime=${currentDate}%2014:10:00&routeCode=HSB-LNG`,
      )
    })
  })

  describe('currentConditionsUrl', () => {
    it('should return the current conditions URL for the provided route', () => {
      expect(currentConditionsUrl('HSB', 'LNG')).toBe(
        `${baseUrl}/current-conditions/HSB-LNG`,
      )
    })
  })

  describe('departuresUrl', () => {
    it('should return the current conditions departures URL for the provided terminal', () => {
      expect(departuresUrl('HSB')).toBe(
        `${baseUrl}/current-conditions/departures?terminalCode=HSB`,
      )
    })
  })

  describe('dailyScheduleUrl', () => {
    it('should return the route fares daily schedule URL for the provided route', () => {
      expect(dailyScheduleUrl('HSB', 'LNG')).toBe(
        `${baseUrl}/routes-fares/schedules/daily/HSB-LNG`,
      )
    })

    it('should return the route fares daily schedule URL for the provided route and date', () => {
      expect(dailyScheduleUrl('HSB', 'LNG', '2025-01-02')).toBe(
        `${baseUrl}/routes-fares/schedules/daily/HSB-LNG?scheduleDate=01/02/2025`,
      )
    })
  })

  describe('seasonalScheduleUrl', () => {
    it('should return the route fares seasonal schedule URL for the provided route', () => {
      expect(seasonalScheduleUrl('HSB', 'LNG')).toBe(
        `${baseUrl}/routes-fares/schedules/seasonal/HSB-LNG`,
      )
    })
  })
})
