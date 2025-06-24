import type { FC } from 'react'
import type { Race } from '../shared/types/race.interface'
import './FlightCard.css'

interface CardProp {
	race: Race
}

const FlightCard: FC<CardProp> = ({ race }) => {
	return (
		<div className='border-gradient w-[364px] p-[2px] mb-3 rounded-2xl'>
			<div className='bg-gray-900 w-full h-[180px] rounded-2xl text-white p-6 mx-auto'>
				<div className='flex justify-between items-center mb-8'>
					<div className='flex items-center'>
						<img
							className='rounded-full mr-4 size-10'
							src={race.logo}
							alt={race.airline}
						/>
						<p>{race.flightNumber}</p>
					</div>
					<div className='flex items-center'>
						<div className='bg-white/10 px-2 py-1 rounded-2xl mr-2'>
							{race.bookingNumber}
						</div>
						<div className='bg-white/10 px-2 py-1 rounded-2xl'>
							{race.aircraft}
						</div>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='text-center'>
						<p>{race.departure.city}</p>
						<p className='font-bold text-2xl'>{race.departure.code}</p>
					</div>
					<div className='flex-1 mx-5 relative'>
						<div className='border-gradient h-0.5 rounded-full'></div>
						<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-white text-3xl'>
							<span className='w-10 h-10'>✈</span>
						</div>
					</div>
					<div className='text-center'>
						<p>{race.arrival.city}</p>
						<p className='font-bold text-2xl tracking-wider'>
							{race.arrival.code}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default FlightCard
