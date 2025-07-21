import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface FavoritesState {
  favoriteFlights: string[]
}

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

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteFlights: loadFavoritesFromStorage(),
  } as FavoritesState,
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
})

export const { toggleFavorite } = favoritesSlice.actions

export const selectFavorites = (state: RootState) =>
  state.favorites.favoriteFlights

export default favoritesSlice.reducer
