import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { races } from '../races'

interface Props {
	closeDetails: () => void
}

const FlightDetails: FC<Props> = ({ closeDetails }) => {
	const [searchParams] = useSearchParams()
	const flight = searchParams.get('flight')
	const race = races.find(item => item.airline === flight)

	const gradientStyle = {
		backgroundImage: `linear-gradient(to bottom, ${race?.colorGradient[0]}, ${race?.colorGradient[1]}`,
	}

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
						<div className='bg-gray-900 rounded-2xl text-white w-110 overflow-hidden'>
							<div
								className='h-70 bg-blue-300 flex flex-col items-center justify-between'
								style={gradientStyle}
							>
								<div className='mt-5 p-7 bg-gray-900 rounded-xl h-20 w-100 flex items-center justify-between'>
									<div>
										<p className='text-orange-300 text-xl'>
											{race?.aircraftReg}
										</p>
										<p className='font-light'>{race?.airline}</p>
									</div>
									<button
										className='rounded-full bg-gray-500 cursor-pointer w-7 h-7 flex items-center justify-center'
										onClick={closeDetails}
									>
										<X />
									</button>
								</div>
								<div className='w-90'>
									<img src={race?.airplane.image} alt={race?.airplane.name} />
								</div>
							</div>
							<div className='p-7'>Body</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
export default FlightDetails
