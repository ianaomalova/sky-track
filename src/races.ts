import type { IFlight } from '@shared_types/race.interface'

export const races: IFlight[] = [
  {
    logo: '/logos/turkish.svg',
    airline: 'TK143',
    bookingNumber: '93247',
    aircraftReg: 'TC-JFP',
    from: {
      city: 'Sofia',
      country: 'Bulgaria',
      countryCode: 'BG',
      timezone: 'UTC+3',
      code: 'SOF',
      coords: [42.6977, 23.3219],
    },
    to: {
      city: 'Beijing',
      country: 'China',
      countryCode: 'CN',
      timezone: 'UTC+8',
      code: 'PEK',
      coords: [39.9042, 116.4074],
    },
    airplane: {
      image: '/planes/turkish.png',
      name: 'Airbus A330',
    },
    colorGradient: ['#ffdede', '#ffbaba'],
    route: {
      speed: 870,
      altitude: 10600,
      distance: 6847, // km
      duration: '7h 52m',
    },
    schedule: {
      departure: {
        scheduled: '14:25',
        actual: '14:31',
      },
      arrival: {
        scheduled: '03:17',
        actual: '03:23',
      },
    },
    flightInfo: {
      country: 'Turkey',
      flagUrl: '/flags/turkey-flag.svg',
    },
  },
  {
    logo: '/logos/ryanair.svg',
    airline: 'RN1782',
    bookingNumber: '7842',
    aircraftReg: 'D-AISP',
    from: {
      city: 'Dublin',
      country: 'Ireland',
      countryCode: 'IE',
      timezone: 'UTC+1',
      code: 'DUB',
      coords: [53.3498, -6.2603],
    },
    to: {
      city: 'Larnaca',
      country: 'Cyprus',
      countryCode: 'CY',
      timezone: 'UTC+3',
      code: 'LCA',
      coords: [34.9167, 33.6233],
    },
    airplane: {
      image: '/planes/ryanair.png',
      name: 'Boeing 737-800',
    },
    colorGradient: ['#A1C6E1', '#88B5E0'],
    route: {
      speed: 840,
      altitude: 11200,
      distance: 2715,
      duration: '3h 14m',
    },
    schedule: {
      departure: {
        scheduled: '08:15',
        actual: '08:24',
      },
      arrival: {
        scheduled: '13:29',
        actual: '13:38',
      },
    },
    flightInfo: {
      country: 'Ireland',
      flagUrl: '/flags/ireland-flag.svg',
    },
  },
  {
    logo: '/logos/s7.svg',
    airline: 'S7124',
    bookingNumber: '88015',
    aircraftReg: 'RA-73415',
    from: {
      city: 'Nice',
      country: 'France',
      countryCode: 'FR',
      timezone: 'UTC+2',
      code: 'NCE',
      coords: [43.7102, 7.262],
    },
    to: {
      city: 'Tbilisi',
      country: 'Georgia',
      countryCode: 'GE',
      timezone: 'UTC+4',
      code: 'TBS',
      coords: [41.7151, 44.8271],
    },
    airplane: {
      image: '/planes/s7.png',
      name: 'Airbus A320neo',
    },
    colorGradient: ['#d6ffe5', '#96f2c1'],
    route: {
      speed: 860,
      altitude: 10900,
      distance: 2456, // km
      duration: '2h 51m',
    },
    schedule: {
      departure: {
        scheduled: '11:40',
        actual: '11:45',
      },
      arrival: {
        scheduled: '16:31',
        actual: '16:36',
      },
    },
    flightInfo: {
      country: 'Russia',
      flagUrl: '/flags/russia-flag.svg',
    },
  },
  {
    logo: '/logos/swiss.svg',
    airline: 'LX318',
    bookingNumber: '94102',
    aircraftReg: 'HB-JHK',
    from: {
      city: 'Porto',
      country: 'Portugal',
      countryCode: 'PT',
      timezone: 'UTC+1',
      code: 'OPO',
      coords: [41.1579, -8.6291],
    },
    to: {
      city: 'Baku',
      country: 'Azerbaijan',
      countryCode: 'AZ',
      timezone: 'UTC+4',
      code: 'GYD',
      coords: [40.4093, 49.8671],
    },
    airplane: {
      image: '/planes/swiss.png',
      name: 'Airbus A220-300',
    },
    colorGradient: ['#e6e6ff', '#a8b4ff'],
    route: {
      speed: 830,
      altitude: 10700,
      distance: 4521, // km
      duration: '5h 27m',
    },
    schedule: {
      departure: {
        scheduled: '09:30',
        actual: '09:35',
      },
      arrival: {
        scheduled: '17:57',
        actual: '18:02',
      },
    },
    flightInfo: {
      country: 'Switzerland',
      flagUrl: '/flags/switzerland-flag.svg',
    },
  },
  {
    logo: '/logos/lufthansa.svg',
    airline: 'LH401',
    bookingNumber: '90936',
    aircraftReg: 'D-AIXD',
    from: {
      city: 'Burgas',
      country: 'Bulgaria',
      countryCode: 'BG',
      timezone: 'UTC+3',
      code: 'BOJ',
      coords: [42.5048, 27.4716],
    },
    to: {
      city: 'Muscat',
      country: 'Oman',
      countryCode: 'OM',
      timezone: 'UTC+4',
      code: 'MCT',
      coords: [23.588, 58.3829],
    },
    airplane: {
      image: '/planes/lufthansa.png',
      name: 'Airbus A350-900',
    },
    colorGradient: ['#e5f2ff', '#9dd2f9'],
    route: {
      speed: 890,
      altitude: 11300,
      distance: 3892, // km
      duration: '4h 22m',
    },
    schedule: {
      departure: {
        scheduled: '16:45',
        actual: '16:52',
      },
      arrival: {
        scheduled: '23:07',
        actual: '23:14',
      },
    },
    flightInfo: {
      country: 'Germany',
      flagUrl: '/flags/germany-flag.svg',
    },
  },
]
