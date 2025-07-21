import FlightDetails from '@components/FlightDetails'
import FlightList from '@components/FlightList'
import Filter from '@components/ui/Filter'
import { Modal } from '@components/ui/Modal'
import { useAppSelector } from '@store/hooks'
import { selectFlights } from '@store/slices/flightSlice'
import { AnimatePresence } from 'framer-motion'
import { useFlightQueryParams } from '@hooks/useFlightQueryParams'
import { type FC } from 'react'
import { useFetchFlights } from '@hooks/useFetchFlights'
import { useFilteredFlights } from '@hooks/useFilteredFlights'
import { useIsMobile } from '@hooks/useIsMobile'
import { useFlightFilter } from '@hooks/useFlightFilter'

const Home: FC = () => {
  const races = useAppSelector(selectFlights)
  useFetchFlights()

  const { isShowDetails, openDetails, closeDetails, updateQueryParam } =
    useFlightQueryParams()

  const { filter, setFilter } = useFlightFilter()

  const filteredRaces = useFilteredFlights(races, filter)

  const isMobile = useIsMobile()

  return (
    <>
      <div className="flex items-start justify-between px-5 pt-5 md:justify-center">
        <div>
          <Filter value={filter} onChange={setFilter} />
          <FlightList
            races={filteredRaces}
            openDetails={openDetails}
            updateQueryParam={updateQueryParam}
          />
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
