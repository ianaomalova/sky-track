import { useState } from 'react'

export const useFlightFilter = () => {
  const [filter, setFilter] = useState('')
  return { filter, setFilter }
}
