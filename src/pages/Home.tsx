import { AnimatePresence } from 'framer-motion'
import { useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import FlightCard from '@components/FlightCard'
import { races } from '../races'
import FlightDetails from '@components/FlightDetails'
import { QUERY_PARAM_FLIGHT } from '@constants/flight.constants'

const Home: FC = () => {
  const [isShowDetails, setIsShowDetails] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  function closeDetails() {
    setIsShowDetails(false)
    searchParams.delete(QUERY_PARAM_FLIGHT)
    setSearchParams(searchParams)
  }

  function openDetails() {
    setIsShowDetails(true)
  }

  function updateQueryParam(value: string) {
    searchParams.set(QUERY_PARAM_FLIGHT, value)
    setSearchParams(searchParams)
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        {races.map((race) => (
          <FlightCard
            key={race.aircraftReg}
            race={race}
            openDetails={openDetails}
            updateQueryParam={updateQueryParam}
          />
        ))}
      </div>

      <AnimatePresence>
        {isShowDetails && <FlightDetails closeDetails={closeDetails} />}
      </AnimatePresence>
    </div>
  )
}
export default Home
