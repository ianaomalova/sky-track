import { Plane } from 'lucide-react'
import type { FC } from 'react'
import GradientProgress from '@components/ui/GradientProgress'
import type { IFlight } from 'types/race.interface'

interface Props {
  race: IFlight
}

const border = 'border-gray-900 dark:border-gray-200 border-b-4'
const flex = 'flex items-center'
export const FlightRoute: FC<Props> = ({ race }) => {
  return (
    <>
      <div className="relative grid grid-cols-2">
        <div
          className={`absolute top-[30%] left-[46%] h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-200`}
        >
          <Plane
            size={28}
            color="#f0a840"
            strokeWidth={1.75}
            absoluteStrokeWidth
            className="absolute top-1.5 left-1.5"
          />
        </div>
        <div className={`${flex} flex-col ${border} border-r-2 pb-2`}>
          <p className="mb-1 pt-4 text-3xl tracking-wide">{race?.from.code}</p>
          <p>{race?.from.country}</p>
          <p className="mt-1 text-gray-400">{race?.from.timezone}</p>
        </div>
        <div className={`${flex} flex-col ${border} border-l-2 pb-2`}>
          <p className="mb-1 pt-4 text-3xl tracking-wide">{race?.to.code}</p>
          <p>{race?.to.country}</p>
          <p className="mt-1 text-gray-400">{race?.to.timezone}</p>
        </div>
      </div>

      <div className={`relative ${border} px-3 py-4`}>
        <GradientProgress progress={50} />
        <div className={`${flex} justify-between`}>
          <div className="mt-3 text-gray-400">2 715 km • 3h 1m</div>
          <div className="mt-3 text-gray-400">882 km • 59m</div>
        </div>
      </div>
    </>
  )
}
