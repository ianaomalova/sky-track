import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { IFlight } from '../../types/race.interface'
import type { RootState } from '../store'

const loadFavoritesFromStorage = (): string[] => {
  try {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      const parsed = JSON.parse(storedFavorites)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (e) {
    console.error('Ошибка при загрузке избранного из localStorage', e)
  }
  return []
}

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IFlight[]>(
        'http://localhost:3001/flights',
      )
      if (response.status !== 200) {
        return rejectWithValue(`Ошибка при загрузке. Статус ${response.status}`)
      }

      return response.data
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(`Ошибка при загрузке. ${e.message}`)
      }
      return rejectWithValue(`Ошибка при загрузке. Неизвестная ошибка`)
    }
  },
)

interface FlightsState {
  flights: IFlight[]
  favoriteFlights: string[]
  loading: boolean
  error: string | null
}

const initialState: FlightsState = {
  flights: [],
  favoriteFlights: loadFavoritesFromStorage(),
  loading: false,
  error: null,
}

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const flightId = action.payload
      const index = state.favoriteFlights.indexOf(flightId)

      if (index === -1) {
        state.favoriteFlights.push(flightId)
      } else {
        state.favoriteFlights.splice(index, 1)
      }

      try {
        localStorage.setItem('favorites', JSON.stringify(state.favoriteFlights))
      } catch (e) {
        console.error('Ошибка сохранения в localStorage', e)
      }
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

export const selectFavoriteFlights = (state: RootState) =>
  state.flights.favoriteFlights
export const selectFlights = (state: RootState) => state.flights.flights
export const selectFlightsLoading = (state: RootState) => state.flights.loading
export const selectFlightsError = (state: RootState) => state.flights.error

export default flightsSlice.reducer
