export * from './flights.selectors'
export * from './flights.slice'
export * from './flights.thunks'

import { flightsSlice } from './flights.slice'
export const flightsReducer = flightsSlice.reducer