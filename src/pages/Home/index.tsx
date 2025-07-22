import SkeletonCard from '@components/FlightCard/SkeletonCard'
import FlightDetails from '@components/FlightDetails'
import FlightList from '@components/FlightList'
import ErrorComponent from '@components/ui/Error'
import Filter from '@components/ui/Filter'
import { Modal } from '@components/ui/Modal'
import { useFetchFlights } from '@hooks/useFetchFlights'
import { useFilteredFlights } from '@hooks/useFilteredFlights'
import { useFlightFilter } from '@hooks/useFlightFilter'
import { useFlightQueryParams } from '@hooks/useFlightQueryParams'
import { useIsMobile } from '@hooks/useIsMobile'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  fetchFlights,
  selectFlights,
  selectFlightsError,
  selectFlightsLoading,
} from '@store/slices/flightSlice'
import { AnimatePresence } from 'framer-motion'
import { type FC } from 'react'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const races = useAppSelector(selectFlights)
  const isLoading = useAppSelector(selectFlightsLoading)
  const error = useAppSelector(selectFlightsError)

  const { isShowDetails, openDetails, closeDetails, updateQueryParam } =
    useFlightQueryParams()

  const { filter, setFilter } = useFlightFilter()
  const filteredRaces = useFilteredFlights(races, filter)
  const isMobile = useIsMobile()

  useFetchFlights()

  if (error) {
    return (
      <ErrorComponent error={error} onRetry={() => dispatch(fetchFlights())} />
    )
  }
  return (
    <>
      {isLoading ? (
        <div className="pt-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
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
      )}
    </>
  )
}
export default Home
