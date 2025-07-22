import { X } from 'lucide-react'
import type { FC } from 'react'
import type { IFlight } from 'types/race.interface'

interface Props {
  closeDetails: () => void
  race: IFlight
}

export const Header: FC<Props> = ({ closeDetails, race }) => {
  const gradientStyle = race
    ? {
        backgroundImage: `linear-gradient(to bottom, ${race.colorGradient[0]}, ${race.colorGradient[1]})`,
      }
    : {}

  return (
    <div
      className="relative z-20 flex h-70 flex-col items-center justify-between"
      style={gradientStyle}
    >
      <div className="mt-5 flex h-20 w-90 items-center justify-between rounded-xl bg-gray-900 p-7 dark:bg-white">
        <div>
          <p className="text-xl text-orange-300">{race?.aircraftReg}</p>
          <p className="font-light">{race?.airline}</p>
        </div>
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-500 dark:bg-gray-300"
          onClick={closeDetails}
        >
          <X />
        </button>
      </div>
      <div className="w-90">
        <img src={race?.airplane.image} alt={race?.airplane.name} />
      </div>
    </div>
  )
}
