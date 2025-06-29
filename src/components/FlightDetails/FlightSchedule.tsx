import type { FC } from 'react'
import type { IFlight } from 'types/race.interface'

interface Props {
  race: IFlight
}

const twoCols = 'grid grid-cols-2'
const flex = 'flex items-center justify-between'
const base = 'border-gray-900 p-3 dark:border-gray-200'

export const FlightSchedule: FC<Props> = ({ race }) => {
  return (
    <>
      <div className={twoCols}>
        <div className={`${flex} border-r-2 border-b-4 ${base}`}>
          <p className="text-gray-400">Scheduled</p>
          <p>{race?.schedule.departure.scheduled}</p>
        </div>
        <div className={`${flex} border-b-4 border-l-2 ${base}`}>
          <p className="text-gray-400">Actual</p>
          <p>{race?.schedule.departure.actual}</p>
        </div>
      </div>
      <div className={twoCols}>
        <div className={`${flex} border-r-2 ${base}`}>
          <p className="text-gray-400">Scheduled</p>
          <p>{race?.schedule.arrival.scheduled}</p>
        </div>
        <div className={`${flex} border-l-2 ${base}`}>
          <p className="text-gray-400">Actual</p>
          <p>{race?.schedule.arrival.actual}</p>
        </div>
      </div>
    </>
  )
}
