import { API_CONFIG } from '@config/api.config'
import type { IFlight } from '@shared_types/race.interface'
import axios from 'axios'

export const FlightsApi = {
  getFlights: async (): Promise<IFlight[]> => {
    const response = await axios.get<IFlight[]>(API_CONFIG.flights)
    return response.data 
  },
}