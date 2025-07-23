import FlightCard from '@components/FlightCard'
import type { FC } from 'react'
import type { IFlight } from '@shared_types/race.interface'

interface FlightListProps {
  races: IFlight[]
  openDetails: () => void
  updateQueryParam: (id: string) => void
}

const FlightList: FC<FlightListProps> = ({
  races,
  openDetails,
  updateQueryParam,
}) => {
  return (
    <>
      {races.map((race) => (
        <FlightCard
          key={race.aircraftReg}
          race={race}
          openDetails={openDetails}
          updateQueryParam={updateQueryParam}
        />
      ))}
    </>
  )
}

export default FlightList
