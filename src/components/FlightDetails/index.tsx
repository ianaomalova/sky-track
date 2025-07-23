import { AnimatePresence, motion } from 'framer-motion'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Actions } from './Actions'
import { FlightInfo } from './FlightInfo'
import { FlightRoute } from './FlightRoute'
import { FlightSchedule } from './FlightSchedule'
import { Header } from './Header'
import { QUERY_PARAM_FLIGHT } from '@constants/flight.constants'
import { useAppSelector } from '@store/hooks'
import { selectFlights } from '@store/slices/flights/flights.selectors'

interface Props {
  closeDetails: () => void
  isMobile?: boolean
}

const FlightDetails: FC<Props> = ({ closeDetails, isMobile }) => {
  const races = useAppSelector(selectFlights)
  const [searchParams] = useSearchParams()
  const flight = searchParams.get(QUERY_PARAM_FLIGHT)
  const race = races.find((item) => item.airline === flight)

  if (isMobile) {
    return (
      race && (
        <div className="fixed z-10 w-100 overflow-hidden rounded-2xl bg-gray-900 text-white dark:bg-gray-200 dark:text-black">
          <Header closeDetails={closeDetails} race={race} />
          <div className="p-3">
            <div className="rounded-xl bg-gray-800 dark:bg-white">
              <FlightRoute race={race} />
              <FlightSchedule race={race} />
            </div>
            <FlightInfo race={race} />
            <Actions />
          </div>
        </div>
      )
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <AnimatePresence mode="wait">
        {race && (
          <motion.div
            key={flight}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="relative z-10 w-100 overflow-hidden rounded-2xl bg-gray-900 text-white dark:bg-gray-200 dark:text-black">
              {/* Header start */}
              <Header closeDetails={closeDetails} race={race} />
              {/* Header end */}

              {/* Body start */}
              <div className="p-3">
                <div className="rounded-xl bg-gray-800 dark:bg-white">
                  <FlightRoute race={race} />
                  <FlightSchedule race={race} />
                </div>

                <FlightInfo race={race} />
                <Actions />
              </div>
              {/* Body end */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default FlightDetails
