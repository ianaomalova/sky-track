import type { FC } from 'react'
import { races } from '../races'
import FlightCard from './FlightCard'

const FlightList: FC = () => {
	console.log(races)
	return (
		<>
			{races.map(race => (
				<FlightCard key={race.flightNumber} race={race} />
			))}
		</>
	)
}
export default FlightList
