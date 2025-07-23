import { DEFAULT_CENTER } from '@constants/map.constants'
import { MapService } from '@services/map.service'
import type { IFlight } from '@shared_types/race.interface'
import type { LatLngExpression } from 'leaflet'
import { useMemo } from 'react'

export const useMapLogic = (
  races: IFlight[],
  selectedCodeRace: string | null,
  progress?: number,
) => {
  const selectedRace = useMemo(() => {
    return races.find((race) => race.airline === selectedCodeRace) ?? null
  }, [races, selectedCodeRace])

  const center: LatLngExpression = selectedRace?.from.coords ?? DEFAULT_CENTER

  const { passedPoints, remainingPoints, currentPosition } = useMemo(() => {
    if (!selectedRace) {
      return {
        passedPoints: [],
        remainingPoints: [],
        currentPosition: null,
      }
    }

    return MapService.splitRoute(
      [selectedRace.from.coords, selectedRace.to.coords],
      progress ?? 0.1,
    )
  }, [selectedRace, progress])

  return {
    selectedRace,
    center,
    passedPoints,
    remainingPoints,
    currentPosition,
  }
}
