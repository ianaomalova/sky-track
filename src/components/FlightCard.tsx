import type { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { IFlight } from '../shared/types/race.interface'
import GradientProgress from './ui/GradientProgress'

interface CardProp {
	race: IFlight
	openDetails: () => void
	updateQueryParam: (key: string, value: string) => void
}

const FlightCard: FC<CardProp> = ({ race, openDetails, updateQueryParam }) => {
	const [searchParams] = useSearchParams()
	const flight = searchParams.get('flight')

	function clickCard() {
		updateQueryParam('flight', race.airline)
		openDetails()
	}

	return (
		<div
			className={`w-[364px] p-[2px] mb-3 rounded-2xl ${
				flight === race.airline ? 'border-gradient' : ''
			}`}
		>
			<div
				className='bg-gray-900 w-full h-[180px] rounded-2xl text-white p-6 mx-auto cursor-pointer'
				onClick={clickCard}
			>
				<div className='flex justify-between items-center mb-8'>
					<div className='flex items-center'>
						<img
							className='rounded-full mr-4 size-10'
							src={race.logo}
							alt={race.airline}
						/>
						<p>{race.airline}</p>
					</div>
					<div className='flex items-center'>
						<div className='bg-white/10 px-2 py-1 rounded-2xl mr-2'>
							{race.bookingNumber}
						</div>
						<div className='bg-white/10 px-2 py-1 rounded-2xl'>
							{race.aircraftReg}
						</div>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='text-center'>
						<p>{race.from.city}</p>
						<p className='font-bold text-2xl'>{race.from.code}</p>
					</div>
					<div className='flex-1 mx-5 relative'>
						<GradientProgress progress={75} />
					</div>
					<div className='text-center'>
						<p>{race.to.city}</p>
						<p className='font-bold text-2xl tracking-wider'>{race.to.code}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default FlightCard
