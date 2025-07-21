import { useAppDispatch } from '@store/hooks'
import { fetchFlights } from '@store/slices/flightSlice'
import { useEffect } from 'react'

export const useFetchFlights = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFlights())
  }, [dispatch])
}
