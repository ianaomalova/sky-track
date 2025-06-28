import { AnimatePresence, motion } from 'framer-motion'
import { Ellipsis, Plane, Route, Share2, Target, X } from 'lucide-react'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { races } from '../races'
import GradientProgress from './ui/GradientProgress'

interface Props {
	closeDetails: () => void
}

const FlightDetails: FC<Props> = ({ closeDetails }) => {
	const [searchParams] = useSearchParams()
	const flight = searchParams.get('flight')
	const race = races.find(item => item.airline === flight)

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
			<AnimatePresence mode='wait'>
				{race && (
					<motion.div
						key={flight}
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '-100%' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<div className='bg-gray-900 dark:bg-gray-200 rounded-2xl text-white dark:text-black w-110 overflow-hidden'>
							{/* Header */}
							<div
								className='h-70 flex flex-col items-center justify-between'
								style={gradientStyle}
							>
								<div className='mt-5 p-7 bg-gray-900 dark:bg-white rounded-xl h-20 w-100 flex items-center justify-between'>
									<div>
										<p className='text-orange-300 text-xl'>
											{race?.aircraftReg}
										</p>
										<p className='font-light'>{race?.airline}</p>
									</div>
									<button
										className='rounded-full bg-gray-500 dark:bg-gray-300 cursor-pointer w-7 h-7 flex items-center justify-center'
										onClick={closeDetails}
									>
										<X />
									</button>
								</div>
								<div className='w-90'>
									<img src={race?.airplane.image} alt={race?.airplane.name} />
								</div>
							</div>

							{/* Body */}
							<div className='p-3'>
								{/*  Part 1 */}
								<div className='bg-gray-800 dark:bg-white rounded-xl'>
									<div className='grid grid-cols-2 relative'>
										<div className='absolute rounded-full bg-gray-900 dark:bg-gray-200 left-[46%] top-[30%] w-10 h-10'>
											<Plane
												size={28}
												color='#f0a840'
												strokeWidth={1.75}
												absoluteStrokeWidth
												className='absolute top-1.5 left-1.5'
											/>
										</div>
										<div className='pb-2 border-r-2 border-b-4 border-gray-900 dark:border-gray-200 flex flex-col items-center'>
											<p className='text-3xl tracking-wide mb-1 pt-4'>
												{race.from.code}
											</p>
											<p>{race.from.country}</p>
											<p className='text-gray-400 mt-1'>{race.from.timezone}</p>
										</div>
										<div className='pb-2 border-l-2 border-b-4 border-gray-900 dark:border-gray-200 flex flex-col items-center'>
											<p className='text-3xl tracking-wide mb-1 pt-4'>
												{race.to.code}
											</p>
											<p>{race.to.country}</p>
											<p className='text-gray-400 mt-1'>{race.to.timezone}</p>
										</div>
									</div>
									<div className='py-4 px-3 border-b-4 border-gray-900 dark:border-gray-200 relative'>
										<GradientProgress progress={50} />
										<div className='flex items-center justify-between'>
											<div className='mt-3 text-gray-400'>2 715 km • 3h 1m</div>
											<div className='mt-3 text-gray-400'>882 km • 59m</div>
										</div>
									</div>
									<div className='grid grid-cols-2'>
										<div className='p-3 flex items-center justify-between border-r-2 border-b-4 border-gray-900 dark:border-gray-200'>
											<p className='text-gray-400'>Scheduled</p>
											<p>{race.schedule.departure.scheduled}</p>
										</div>
										<div className='p-3 flex items-center justify-between border-l-2 border-b-4 border-gray-900 dark:border-gray-200'>
											<p className='text-gray-400'>Actual</p>
											<p>{race.schedule.departure.actual}</p>
										</div>
									</div>
									<div className='grid grid-cols-2'>
										<div className='p-3 flex items-center justify-between border-r-2 border-gray-900 dark:border-gray-200'>
											<p className='text-gray-400'>Scheduled</p>
											<p>{race.schedule.arrival.scheduled}</p>
										</div>
										<div className='p-3 flex items-center justify-between border-l-2 border-gray-900 dark:border-gray-200'>
											<p className='text-gray-400'>Actual</p>
											<p>{race.schedule.arrival.actual}</p>
										</div>
									</div>
								</div>

								{/* Part 2 */}
								<div className='bg-gray-800 dark:bg-white rounded-xl mt-3'>
									<div className='p-2 pl-3 border-b-4 border-gray-900 bg-gray-700 dark:bg-gray-300 rounded-t-xl dark:border-gray-200'>
										Flight information
									</div>
									<div className='grid grid-cols-2'>
										<div className='p-3 border-r-2 border-b-4 border-gray-900 dark:bg-white dark:border-gray-200'>
											{race.airplane.name}
										</div>
										<div className='p-3 border-l-2 border-b-4 border-gray-900 dark:bg-white dark:border-gray-200 flex items-center gap-2'>
											<img
												src={race.flightInfo.flagUrl}
												className='w-5 h-5'
												alt=''
											/>
											{race.flightInfo.country}
										</div>
									</div>
									<div className='grid grid-cols-2'>
										<div className='p-3 border-r-2 border-gray-900  dark:border-gray-200 flex items-center justify-between'>
											<p className='text-gray-400'>Speed</p>
											<p>{race.route.speed} km/h</p>
										</div>
										<div className='p-3 border-l-2 border-gray-900  dark:border-gray-200 flex items-center justify-between'>
											<p className='text-gray-400'>Altitude</p>
											<p>{race.route.altitude} m</p>
										</div>
									</div>
								</div>

								{/* Part 3 */}
								<div className='rounded-xl bg-gray-800 dark:bg-white mt-3 grid grid-cols-4'>
									<div className='border-r-2 border-gray-900 dark:border-gray-200 p-3'>
										<button className='flex flex-col gap-2 items-center justify-center mx-auto cursor-pointer'>
											<Route />
											<p>Route</p>
										</button>
									</div>
									<div className='border-l-2 border-r-2 border-gray-900 dark:border-gray-200 p-3'>
										<button className='flex flex-col gap-2 items-center justify-center mx-auto cursor-pointer'>
											<Target />
											<p>Follow</p>
										</button>
									</div>
									<div className='border-l-2 border-r-2 border-gray-900 dark:border-gray-200 p-3'>
										<button className='flex flex-col gap-2 items-center justify-center mx-auto cursor-pointer'>
											<Share2 />
											<p>Share</p>
										</button>
									</div>
									<div className='border-l-2 border-gray-900 dark:border-gray-200 p-3'>
										<button className='flex flex-col gap-2 items-center justify-center mx-auto cursor-pointer'>
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
