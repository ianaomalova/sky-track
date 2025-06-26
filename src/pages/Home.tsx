import { AnimatePresence } from 'framer-motion'
import { useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import FlightCard from '../components/FlightCard'
import FlightDetails from '../components/FlightDetails'
import { races } from '../races'

const Home: FC = () => {
	const [isShowDetails, setIsShowDetails] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	function closeDetails() {
		setIsShowDetails(false)
		searchParams.delete('flight')
		setSearchParams(searchParams)
	}

	function openDetails() {
		setIsShowDetails(true)
	}

	function updateQueryParam(key: string, value: string) {
		searchParams.set(key, value)
		setSearchParams(searchParams)
	}

	return (
		<div className='flex items-start justify-between'>
			<div>
				{races.map(race => (
					<FlightCard
						key={race.aircraftReg}
						race={race}
						openDetails={openDetails}
						updateQueryParam={updateQueryParam}
					/>
				))}
			</div>

			<AnimatePresence>
				{isShowDetails && <FlightDetails closeDetails={closeDetails} />}
			</AnimatePresence>
		</div>
	)
}
export default Home
