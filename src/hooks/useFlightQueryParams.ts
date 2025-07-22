import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QUERY_PARAM_FLIGHT } from '@constants/flight.constants'

export const useFlightQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isShowDetails, setIsShowDetails] = useState(false)

  const openDetails = () => setIsShowDetails(true)

  function closeDetails() {
    setIsShowDetails(false)
    searchParams.delete(QUERY_PARAM_FLIGHT)
    setSearchParams(searchParams)
  }

  const updateQueryParam = (value: string) => {
    searchParams.set(QUERY_PARAM_FLIGHT, value)
    setSearchParams(searchParams)
  }

  return {
    searchParams,
    isShowDetails,
    openDetails,
    closeDetails,
    updateQueryParam,
  }
}
