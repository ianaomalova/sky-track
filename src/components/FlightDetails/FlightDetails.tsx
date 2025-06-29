import GradientProgress from '@ui/GradientProgress'
import { AnimatePresence, motion } from 'framer-motion'
import { Ellipsis, Plane, Route, Share2, Target, X } from 'lucide-react'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { races } from '../../races'

interface Props {
  closeDetails: () => void
}

const FlightDetails: FC<Props> = ({ closeDetails }) => {
  const [searchParams] = useSearchParams()
  const flight = searchParams.get('flight')
  const race = races.find((item) => item.airline === flight)

  const gradientStyle = race
    ? {
        backgroundImage: `linear-gradient(to bottom, ${race.colorGradient[0]}, ${race.colorGradient[1]})`,
      }
    : {}

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
              {/* Header */}
              <div
                className="flex h-70 flex-col items-center justify-between"
                style={gradientStyle}
              >
                <div className="mt-5 flex h-20 w-100 items-center justify-between rounded-xl bg-gray-900 p-7 dark:bg-white">
                  <div>
                    <p className="text-xl text-orange-300">
                      {race?.aircraftReg}
                    </p>
                    <p className="font-light">{race?.airline}</p>
                  </div>
                  <button
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-500 dark:bg-gray-300"
                    onClick={closeDetails}
                  >
                    <X />
                  </button>
                </div>
                <div className="w-90">
                  <img src={race?.airplane.image} alt={race?.airplane.name} />
                </div>
              </div>

              {/* Body */}
              <div className="p-3">
                {/*  Part 1 */}
                <div className="rounded-xl bg-gray-800 dark:bg-white">
                  <div className="relative grid grid-cols-2">
                    <div className="absolute top-[30%] left-[46%] h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-200">
                      <Plane
                        size={28}
                        color="#f0a840"
                        strokeWidth={1.75}
                        absoluteStrokeWidth
                        className="absolute top-1.5 left-1.5"
                      />
                    </div>
                    <div className="flex flex-col items-center border-r-2 border-b-4 border-gray-900 pb-2 dark:border-gray-200">
                      <p className="mb-1 pt-4 text-3xl tracking-wide">
                        {race.from.code}
                      </p>
                      <p>{race.from.country}</p>
                      <p className="mt-1 text-gray-400">{race.from.timezone}</p>
                    </div>
                    <div className="flex flex-col items-center border-b-4 border-l-2 border-gray-900 pb-2 dark:border-gray-200">
                      <p className="mb-1 pt-4 text-3xl tracking-wide">
                        {race.to.code}
                      </p>
                      <p>{race.to.country}</p>
                      <p className="mt-1 text-gray-400">{race.to.timezone}</p>
                    </div>
                  </div>
                  <div className="relative border-b-4 border-gray-900 px-3 py-4 dark:border-gray-200">
                    <GradientProgress progress={50} />
                    <div className="flex items-center justify-between">
                      <div className="mt-3 text-gray-400">2 715 km • 3h 1m</div>
                      <div className="mt-3 text-gray-400">882 km • 59m</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center justify-between border-r-2 border-b-4 border-gray-900 p-3 dark:border-gray-200">
                      <p className="text-gray-400">Scheduled</p>
                      <p>{race.schedule.departure.scheduled}</p>
                    </div>
                    <div className="flex items-center justify-between border-b-4 border-l-2 border-gray-900 p-3 dark:border-gray-200">
                      <p className="text-gray-400">Actual</p>
                      <p>{race.schedule.departure.actual}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center justify-between border-r-2 border-gray-900 p-3 dark:border-gray-200">
                      <p className="text-gray-400">Scheduled</p>
                      <p>{race.schedule.arrival.scheduled}</p>
                    </div>
                    <div className="flex items-center justify-between border-l-2 border-gray-900 p-3 dark:border-gray-200">
                      <p className="text-gray-400">Actual</p>
                      <p>{race.schedule.arrival.actual}</p>
                    </div>
                  </div>
                </div>

                {/* Part 2 */}
                <div className="mt-3 rounded-xl bg-gray-800 dark:bg-white">
                  <div className="rounded-t-xl border-b-4 border-gray-900 bg-gray-700 p-2 pl-3 dark:border-gray-200 dark:bg-gray-300">
                    Flight information
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-r-2 border-b-4 border-gray-900 p-3 dark:border-gray-200 dark:bg-white">
                      {race.airplane.name}
                    </div>
                    <div className="flex items-center gap-2 border-b-4 border-l-2 border-gray-900 p-3 dark:border-gray-200 dark:bg-white">
                      <img
                        src={race.flightInfo.flagUrl}
                        className="h-5 w-5"
                        alt=""
                      />
                      {race.flightInfo.country}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center justify-between border-r-2 border-gray-900 p-3 dark:border-gray-200">
                      <p className="text-gray-400">Speed</p>
                      <p>{race.route.speed} km/h</p>
                    </div>
                    <div className="flex items-center justify-between border-l-2 border-gray-900 p-3 dark:border-gray-200">
                      <p className="text-gray-400">Altitude</p>
                      <p>{race.route.altitude} m</p>
                    </div>
                  </div>
                </div>

                {/* Part 3 */}
                <div className="mt-3 grid grid-cols-4 rounded-xl bg-gray-800 dark:bg-white">
                  <div className="border-r-2 border-gray-900 p-3 dark:border-gray-200">
                    <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
                      <Route />
                      <p>Route</p>
                    </button>
                  </div>
                  <div className="border-r-2 border-l-2 border-gray-900 p-3 dark:border-gray-200">
                    <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
                      <Target />
                      <p>Follow</p>
                    </button>
                  </div>
                  <div className="border-r-2 border-l-2 border-gray-900 p-3 dark:border-gray-200">
                    <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
                      <Share2 />
                      <p>Share</p>
                    </button>
                  </div>
                  <div className="border-l-2 border-gray-900 p-3 dark:border-gray-200">
                    <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
                      <Ellipsis />
                      <p>More</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default FlightDetails
