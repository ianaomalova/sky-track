import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FlightService } from '@services/flights.service'
import type { IFlight } from '@shared_types/race.interface'
import { fetchFlights } from './flights.thunks'

interface FlightsState {
  flights: IFlight[]
  favoriteFlights: string[]
  loading: boolean
  error: string | null
}

const initialState: FlightsState = {
  flights: [],
  favoriteFlights: FlightService.loadFavorites(),
  loading: false,
  error: null,
}

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const flightId = action.payload
      state.favoriteFlights = FlightService.toggleFavorites(state.favoriteFlights, flightId)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.flights = action.payload
        state.loading = false
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.error = action.error?.message || 'Something went wrong'
        }
      })
  },
})

export const { toggleFavorite } = flightsSlice.actions
export const flightsReducer = flightsSlice.reducer