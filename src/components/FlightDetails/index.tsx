import { AnimatePresence, motion } from 'framer-motion'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { races } from '../../races'
import { Actions } from './Actions'
import { FlightInfo } from './FlightInfo'
import { FlightRoute } from './FlightRoute'
import { FlightSchedule } from './FlightSchedule'
import { Header } from './Header'

interface Props {
  closeDetails: () => void
}

const FlightDetails: FC<Props> = ({ closeDetails }) => {
  const [searchParams] = useSearchParams()
  const flight = searchParams.get('flight')
  const race = races.find((item) => item.airline === flight)

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
            <div className="w-110 overflow-hidden rounded-2xl bg-gray-900 text-white dark:bg-gray-200 dark:text-black">
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
