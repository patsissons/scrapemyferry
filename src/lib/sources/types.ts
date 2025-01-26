export interface Routes {
  regions: {
    name: string
    from: {
      name: string
      code: string
      to: {
        name: string
        code: string
        urlPath: string
        special?: boolean
      }[]
    }[]
  }[]
}

export interface Sailing {
  time: string
  space: {
    total: number
    standard: number
    mixed: number
  }
}

export interface CurrentConditions {
  lastUpdated: string
  departures: {
    departure: {
      scheduled: string
      actual: string
      vessel: {
        name: string
        url: string
      }
    }
    status: string
  }[]
  webcams: {
    url: string
    label: string
  }[]
  terminal: {
    name: string
    address: string
  }
}

export interface DailyScheduleSailing {
  depart: string
  arrive: string
  duration: string
}

export interface DailySchedule {
  sailings: DailyScheduleSailing[]
}

export interface SeasonalScheduleSailing {
  depart: string
  arrive: string
  duration: string
  messages: string[]
}

export interface SeasonalSchedule {
  days: {
    day: string
    sailings: SeasonalScheduleSailing[]
  }[]
}

export interface SourceConfig {
  tz: string
  baseUrl: string
}

export interface Source {
  config: SourceConfig
  currentConditions(from: string, to: string): Promise<CurrentConditions>
  dailySchedule(from: string, to: string, date?: string): Promise<DailySchedule>
  routes(): Promise<Routes>
  sailing(from: string, to: string, departureTime: string): Promise<Sailing>
  seasonalSchedule(from: string, to: string): Promise<SeasonalSchedule>
}
