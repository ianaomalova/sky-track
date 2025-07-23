import { createAsyncThunk } from '@reduxjs/toolkit'
import { FlightService } from '@services/flights.service'

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (_, { rejectWithValue }) => {
    try {
      const data = await FlightService.getFlights()
      return data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(`Ошибка загрузки: ${error.message}`)
      }
      return rejectWithValue('Неизвестная ошибка при загрузке рейсов.')
    }
  },
)