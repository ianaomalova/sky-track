import type { FC } from 'react'
import type { IFlight } from 'types/race.interface'

interface Props {
  race: IFlight
}

const cellBase = 'p-3 border-gray-900 dark:border-gray-200 dark:bg-white'
const leftCell = `${cellBase} border-r-2`
const rightCell = `${cellBase} border-l-2`
const infoHeader =
  'rounded-t-xl border-b-4 border-gray-900 bg-gray-700 p-2 pl-3 dark:border-gray-200 dark:bg-gray-300'
const flexCenter = 'flex items-center'
const borderBottom = 'border-b-4'
const twoCols = 'grid grid-cols-2'

export const FlightInfo: FC<Props> = ({ race }) => {
  return (
    <div className="mt-3 rounded-xl bg-gray-800 dark:bg-white">
      <div className={infoHeader}>Flight information</div>

      <div className={twoCols}>
        <div className={`${leftCell} ${borderBottom}`}>
          {race?.airplane.name}
        </div>
        <div className={`${rightCell} ${flexCenter} ${borderBottom} gap-3`}>
          <img src={race?.flightInfo.flagUrl} className="h-5 w-5" alt="" />
          {race?.flightInfo.country}
        </div>
      </div>

      <div className={twoCols}>
        <div className={`${cellBase} ${flexCenter} justify-between border-r-2`}>
          <p className="text-gray-400">Speed</p>
          <p>{race?.route.speed} km/h</p>
        </div>
        <div className={`${cellBase} ${flexCenter} justify-between border-l-2`}>
          <p className="text-gray-400">Altitude</p>
          <p>{race?.route.altitude} m</p>
        </div>
      </div>
    </div>
  )
}
