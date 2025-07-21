import type { IFlight } from 'types/race.interface'
import { useMemo } from 'react'

export const useFilteredFlights = (races: IFlight[], filter: string) => {
  return useMemo(() => {
    return races.filter(
      (race) =>
        race.flightInfo.country.toLowerCase().includes(filter.toLowerCase()) ||
        race.from.city.toLowerCase().includes(filter.toLowerCase()),
    )
  }, [races, filter])
}
