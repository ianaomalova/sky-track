export interface IFlightAirplane {
  image: string
  name: string
}

export interface IFlightRoute {
  speed: number
  altitude: number
  distance: number
  duration: string
}

export interface IFlightLocation {
  city: string
  country: string
  countryCode: string
  timezone: string
  code: string
  coords: [number, number]
}

export interface ISchedule {
  departure: {
    scheduled: string
    actual: string
  }
  arrival: {
    scheduled: string
    actual: string
  }
}

export interface IFlightInfo {
  country: string
  flagUrl: string
}

export interface IFlight {
  airplane: IFlightAirplane
  bookingNumber: string
  route: IFlightRoute
  logo: string
  colorGradient: [string, string]
  airline: string
  aircraftReg: string
  from: IFlightLocation
  to: IFlightLocation
  schedule: ISchedule
  flightInfo: IFlightInfo
}
