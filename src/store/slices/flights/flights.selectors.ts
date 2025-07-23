import type { RootState } from '../../store'

export const selectFavoriteFlights = (state: RootState) =>
  state.flights.favoriteFlights

export const selectFlights = (state: RootState) => state.flights.flights

export const selectFlightsLoading = (state: RootState) => state.flights.loading

export const selectFlightsError = (state: RootState) => state.flights.error
