export interface Routes {
  url: string
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
  url: string
  time: string
  // space numbers are a percentage of available space
  space: {
    total: number
    standard: number
    mixed: number
  }
}

export interface CurrentConditions {
  url: string
  lastUpdated: string
  nextSailing: {
    scheduled: string
    // total space is a percentage of available space
    totalSpace: number
  }
  trackingMap: string
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
  type: string
}

export interface DailySchedule {
  url: string
  sailings: DailyScheduleSailing[]
}

export interface SeasonalScheduleSailing {
  depart: string
  arrive: string
  duration: string
  messages: string[]
}

export interface SeasonalSchedule {
  url: string
  days: {
    day: string
    sailings: SeasonalScheduleSailing[]
  }[]
}

export interface Departures {
  url: string
  name: string
  terminals: {
    name: string
    duration: string
    departures: {
      times: {
        scheduled: string
        actual: string
        arrival: string
        arrivalIsEta?: boolean
      }
      vessel: {
        name: string
        url: string
      }
      status?: string
    }[]
  }[]
}

export interface SourceConfig {
  tz: string
  baseUrl: string
}

export interface Source {
  config: SourceConfig
  currentConditions(from: string, to: string): Promise<CurrentConditions>
  currentConditionsBeta(
    from: string,
    to: string,
  ): Promise<CurrentConditionsBeta>
  dailySchedule(from: string, to: string, date?: string): Promise<DailySchedule>
  departures(from: string): Promise<Departures>
  routes(): Promise<Routes>
  sailing(from: string, to: string, departureTime: string): Promise<Sailing>
  seasonalSchedule(from: string, to: string): Promise<SeasonalSchedule>
}

export interface CurrentConditionsBeta {
  url: string
  lastUpdated: string
  links: {
    booking: string
    departuresArrivals: string
    calculateFare: string
    schedule: string
    trackingMap: string
  }
  arrivedUnderway: {
    scheduled: string
    departed: string
    arrived: string
    vessel: {
      name: string
      url: string
    }
    status: {
      delayed: boolean
    }
  }[]
  upcoming: {
    nextAvailable: boolean
    scheduled: string
    etd: string
    eta: string
    vessel: {
      name: string
      url: string
    }
    status: {
      delayed: boolean
    }
    availableSpace: number
    notCheckedIn: number
    checkedIn: number
    checkinOpensAt: string
    spaceReleasedAt: string
  }[]
  tomorrow: {
    scheduled: string
    etd: string
    vessel: {
      name: string
      url: string
    }
    availableSpace: number
  }[]
  cameras: {
    lastUpdated: string
    webcams: {
      url: string
      label: string
    }[]
  }
  terminal: {
    name: string
    address: string
  }
}
