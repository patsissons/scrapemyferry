import dayjs from 'dayjs'

export const baseUrl = 'https://www.bcferries.com'
export const bookingPath = '/RouteSelectionPage'
export const tz = 'America/Vancouver'
export const tzOffset = dayjs().tz(tz).format('Z')
export const config = {
  baseUrl,
  bookingPath,
  tz,
  tzOffset,
}
