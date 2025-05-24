import scrapeIt from 'scrape-it'
import type { CurrentConditionsBeta } from '../types'
import { currentConditionsBetaUrl } from './urls'
import { parsePercentage, parseUrlPath } from './utils'

type CurrentConditionsBetaData = Omit<
  CurrentConditionsBeta,
  'url' | 'arrivedUnderway' | 'upcoming' | 'tomorrow'
> & {
  bookingLink: string
  arrivedUnderway: {
    sailings: {
      sailing: {
        info: {
          arrived: string
          departed: string
          scheduled: string
          vessel: {
            name: string
            url: string
          }
        }
        status: { delayed: boolean }
      }
    }[]
  }
  upcoming: {
    sailings: {
      nextAvailable: boolean
      sailing: {
        info: {
          eta: string
          etd: string
          scheduled: string
          vessel: {
            name: string
            url: string
          }
        }
        status: { delayed: boolean }
      }
      space: {
        availableSpace: number
        notCheckedIn: number
        checkedIn: number
      }
      times: {
        checkinOpensAt: string
        spaceReleasedAt: string
      }
    }[]
  }
  tomorrow: {
    sailings: {
      availableSpace: number
      sailing: {
        etd: string
        scheduled: string
        vessel: {
          name: string
          url: string
        }
      }
    }[]
  }
  trackingMap: string
}

export function currentConditionsBeta(from: string, to: string) {
  const url = currentConditionsBetaUrl(from, to)
  return scrapeIt<CurrentConditionsBetaData>(url, {
    lastUpdated: {
      selector: '.cc-beta-header .cc-last-update-text',
      convert: (text) => text.toUpperCase().replace('LAST UPDATED:', '').trim(),
    },
    bookingLink: {
      selector: 'a.book-this-route-btn',
      attr: 'href',
      convert: parseUrlPath,
    },
    arrivedUnderway: {
      selector: '.sailing-statuses-accordion',
      eq: 0,
      data: {
        sailings: {
          listItem: '.sailing-status',
          data: {
            sailing: {
              selector: '.sailing-status-details',
              data: {
                status: {
                  selector: '.status',
                  data: {
                    delayed: {
                      selector: '.status-delayed',
                      convert: Boolean,
                    },
                  },
                },
                info: {
                  selector: '.status-info',
                  data: {
                    scheduled: {
                      selector: '.status-schedule-time',
                      convert: (text) => text.toUpperCase().trim(),
                    },
                    departed: {
                      selector:
                        '.status-departure-arrival-info .status-departure-arrival-time',
                      eq: 0,
                      convert: (text) => text.toUpperCase().trim(),
                    },
                    arrived: {
                      selector:
                        '.status-departure-arrival-info .status-departure-arrival-time',
                      eq: 1,
                      convert: (text) => text.toUpperCase().trim(),
                    },
                    vessel: {
                      selector: '.vessel-name',
                      data: {
                        name: {},
                        url: {
                          selector: 'a',
                          attr: 'href',
                          convert: parseUrlPath,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    upcoming: {
      selector: '.sailing-statuses-accordion',
      eq: 1,
      data: {
        sailings: {
          listItem: '.sailing-status',
          data: {
            nextAvailable: {
              selector: '.nextAvailableSailingHeaderText',
              convert: Boolean,
            },
            sailing: {
              selector: '.sailing-status-details',
              data: {
                status: {
                  selector: '.status',
                  data: {
                    delayed: {
                      selector: '.status-delayed',
                      convert: Boolean,
                    },
                  },
                },
                info: {
                  selector: '.status-info',
                  data: {
                    scheduled: {
                      selector: '.status-schedule-time',
                      convert: (text) => text.toUpperCase().trim(),
                    },
                    etd: {
                      selector:
                        '.status-departure-arrival-info .status-departure-arrival-time',
                      eq: 0,
                      convert: (text) => text.toUpperCase().trim(),
                    },
                    eta: {
                      selector:
                        '.status-departure-arrival-info .status-departure-arrival-time',
                      eq: 1,
                      convert: (text) => text.toUpperCase().trim(),
                    },
                    vessel: {
                      selector: '.vessel-name',
                      data: {
                        name: {},
                        url: {
                          selector: 'a',
                          attr: 'href',
                          convert: parseUrlPath,
                        },
                      },
                    },
                  },
                },
              },
            },
            space: {
              selector: '.chart-container',
              data: {
                availableSpace: {
                  attr: 'data-available-space',
                  convert: parsePercentage,
                },
                notCheckedIn: {
                  attr: 'data-reservations-not-checked-in',
                  convert: parsePercentage,
                },
                checkedIn: {
                  attr: 'data-vehicles-checked-in',
                  convert: parsePercentage,
                },
              },
            },
            times: {
              selector: '.vehicle-checkin-times',
              data: {
                checkinOpensAt: {
                  selector: 'p > strong',
                  eq: 0,
                },
                spaceReleasedAt: {
                  selector: 'p > strong',
                  eq: 1,
                },
              },
            },
          },
        },
      },
    },
    tomorrow: {
      selector: '.sailing-statuses-accordion',
      eq: 2,
      data: {
        sailings: {
          listItem: '.sailing-status',
          data: {
            sailing: {
              selector: '.sailing-status-details',
              data: {
                scheduled: {
                  selector: '.status-schedule-time',
                },
                etd: {
                  selector: '.status-departure-arrival-time',
                },
                vessel: {
                  selector: '.vessel-name',
                  data: {
                    name: {},
                    url: {
                      selector: 'a',
                      attr: 'href',
                      convert: parseUrlPath,
                    },
                  },
                },
              },
            },
            availableSpace: {
              selector: '.tomorrow-space-details > p > span',
              eq: 0,
              convert: parsePercentage,
            },
          },
        },
      },
    },
    links: {
      selector: '.information-div',
      data: {
        departuresArrivals: {
          selector: '.m-info > a',
          eq: 0,
          attr: 'href',
          convert: parseUrlPath,
        },
        calculateFare: {
          selector: '.m-info > a',
          eq: 1,
          attr: 'href',
          convert: parseUrlPath,
        },
        schedule: {
          selector: '.m-info > a',
          eq: 2,
          attr: 'href',
          convert: parseUrlPath,
        },
      },
    },
    cameras: {
      selector: '.cc-beta-webcams-section',
      data: {
        lastUpdated: {
          selector: '.cc-last-update-text > p > span',
          convert: (text) =>
            text.toUpperCase().replace('LAST UPDATED:', '').trim(),
        },
        webcams: {
          listItem: 'div:has(.webcam-img)',
          data: {
            url: {
              selector: '.webcam-img',
              attr: 'src',
            },
            label: {
              selector: 'p',
            },
          },
        },
      },
    },
    trackingMap: {
      selector: '.cc-beta-ferry-tracking-map',
      attr: 'src',
    },
    terminal: {
      selector: '.cc-beta-terminal-info',
      data: {
        name: {
          selector: 'strong',
          eq: 0,
        },
        address: {
          selector: 'p',
          eq: 0,
        },
      },
    },
  }).then(transform)

  function transform({
    data: {
      arrivedUnderway,
      bookingLink,
      links,
      tomorrow,
      upcoming,
      trackingMap,
      ...data
    },
  }: scrapeIt.ScrapeResult<CurrentConditionsBetaData>): CurrentConditionsBeta {
    return {
      url,
      links: {
        ...links,
        booking: bookingLink,
        trackingMap,
      },
      arrivedUnderway: arrivedUnderway.sailings.map(
        ({ sailing: { status, info } }) => ({
          status,
          ...info,
        }),
      ),
      upcoming: upcoming.sailings.map(
        ({ nextAvailable, sailing: { info, status }, space, times }) => ({
          nextAvailable,
          status,
          ...info,
          ...space,
          ...times,
        }),
      ),
      tomorrow: tomorrow.sailings.map(({ availableSpace, sailing }) => ({
        ...sailing,
        availableSpace,
      })),
      ...data,
    }
  }
}
