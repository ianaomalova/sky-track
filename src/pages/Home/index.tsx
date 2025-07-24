import SkeletonCard from '@components/FlightCard/SkeletonCard'
import FlightDetails from '@components/FlightDetails'
import FlightList from '@components/FlightList'
import MapComponent from '@components/Map'
import ErrorComponent from '@components/ui/Error'
import Filter from '@components/ui/Filter'
import { Modal } from '@components/ui/Modal'
import { QUERY_PARAM_FLIGHT } from '@constants/flight.constants'
import { useFetchFlights } from '@hooks/useFetchFlights'
import { useFilteredFlights } from '@hooks/useFilteredFlights'
import { useFlightFilter } from '@hooks/useFlightFilter'
import { useFlightQueryParams } from '@hooks/useFlightQueryParams'
import { useIsMobile } from '@hooks/useIsMobile'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  selectFlights,
  selectFlightsError,
  selectFlightsLoading,
} from '@store/slices/flights/flights.selectors'
import { fetchFlights } from '@store/slices/flights/flights.thunks'
import { AnimatePresence } from 'framer-motion'
import { type FC } from 'react'
import Select from 'react-select'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const races = useAppSelector(selectFlights)
  const isLoading = useAppSelector(selectFlightsLoading)
  const error = useAppSelector(selectFlightsError)

  const {
    searchParams,
    isShowDetails,
    openDetails,
    closeDetails,
    updateQueryParam,
  } = useFlightQueryParams()

  const { filter, setFilter } = useFlightFilter()
  const filteredRaces = useFilteredFlights(races, filter)
  const isMobile = useIsMobile()
  const flightCode = searchParams.get(QUERY_PARAM_FLIGHT)

  useFetchFlights()

  if (error) {
    return (
      <ErrorComponent error={error} onRetry={() => dispatch(fetchFlights())} />
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-0">
        <MapComponent races={races} selectedCodeRace={flightCode} />
      </div>
      {isLoading ? (
        <div className="pt-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex items-start justify-between px-5 pt-5 md:justify-center">
          <div className="h-180 overflow-scroll">
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
                  <div className="h-180 overflow-scroll">
                    <FlightDetails closeDetails={closeDetails} />
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
export default Home
