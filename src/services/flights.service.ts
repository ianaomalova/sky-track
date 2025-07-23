import { FlightsApi } from '@api/flights.api'
import { loadFavorites, saveFavorites } from '@utils/localStorage'

export const FlightService = {
  getFlights: () => {
    return FlightsApi.getFlights()
  },

  loadFavorites: () => loadFavorites(),

  saveFavorites: (favorites: string[]) => saveFavorites(favorites),

  toggleFavorites: (currentFavorites: string[], id: string) => {
    const index = currentFavorites.indexOf(id)
    const updated = [...currentFavorites]

      if (index === -1) {
        updated.push(id)
      } else {
        updated.splice(index, 1)
      }

      saveFavorites(updated)
      return updated
  }
}