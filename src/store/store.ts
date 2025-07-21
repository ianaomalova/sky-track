import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'
// import flightsReducer from './slices/flightsSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    // flights: flightsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;