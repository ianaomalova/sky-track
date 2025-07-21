import FlightCard from '@components/FlightCard'
import FlightDetails from '@components/FlightDetails'
import { MapComponent } from '@components/Map'
import Filter from '@components/ui/Filter'
import { Modal } from '@components/ui/Modal'
import { QUERY_PARAM_FLIGHT } from '@constants/flight.constants'
import { AnimatePresence } from 'framer-motion'
import { useState, type FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSearchParams } from 'react-router-dom'
import { races } from '../races'

const Home: FC = () => {
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [filter, setFilter] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

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

  const filteredRaces = races.filter((race) => {
    return (
      race.flightInfo.country.toLowerCase().includes(filter.toLowerCase()) ||
      race.from.city.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <>
      <MapComponent />
      <div className="flex items-start justify-between px-5 pt-5 md:justify-center">
        <div>
          <Filter value={filter} onChange={setFilter} />
          {filteredRaces.map((race) => (
            <FlightCard
              key={race.aircraftReg}
              race={race}
              openDetails={openDetails}
              updateQueryParam={updateQueryParam}
            />
          ))}
        </div>

        <AnimatePresence>
          {isShowDetails && (
            <>
              {isMobile ? (
                <Modal isOpen={isShowDetails} onClose={closeDetails}>
                  <FlightDetails closeDetails={closeDetails} isMobile />
                </Modal>
              ) : (
                <FlightDetails closeDetails={closeDetails} />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
export default Home
