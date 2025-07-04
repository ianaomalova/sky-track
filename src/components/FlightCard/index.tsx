import GradientProgress from '@ui/GradientProgress'
import { Heart } from 'lucide-react'
import { useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { IFlight } from 'types/race.interface'

interface CardProp {
  race: IFlight
  openDetails?: () => void
  updateQueryParam?: (value: string) => void
}

const FlightCard: FC<CardProp> = ({ race, openDetails, updateQueryParam }) => {
  const [searchParams] = useSearchParams()
  const flight = searchParams.get('flight')
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  function clickCard() {
    if (openDetails && updateQueryParam) {
      updateQueryParam(race.airline)
      openDetails()
    }
  }

  function toggleFavorites(id: string) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    )
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = favorites.includes(race.airline)

  return (
    <div
      className={`mb-3 w-[380px] rounded-2xl p-[2px] ${
        flight === race.airline ? 'border-gradient' : ''
      }`}
    >
      <div
        className="mx-auto h-[180px] w-full cursor-pointer rounded-2xl bg-gray-900 p-6 text-white dark:bg-white dark:text-gray-950"
        onClick={clickCard}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="mr-4 size-10 rounded-full"
              src={race.logo}
              alt={race.airline}
            />
            <p>{race.airline}</p>
          </div>
          <div className="flex items-center">
            <div className="mr-2 rounded-2xl bg-white/10 px-2 py-1">
              {race.bookingNumber}
            </div>
            <div className="mr-3 rounded-2xl bg-white/10 px-2 py-1">
              {race.aircraftReg}
            </div>
            <Heart
              className={isFavorite ? 'text-red-500' : 'text-gray-400'}
              fill={isFavorite ? 'currentColor' : 'none'}
              onClick={() => toggleFavorites(race.airline)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-center">
            <p>{race.from.city}</p>
            <p className="text-2xl font-bold">{race.from.code}</p>
          </div>
          <div className="relative mx-5 flex-1">
            <GradientProgress progress={75} />
          </div>
          <div className="text-center">
            <p>{race.to.city}</p>
            <p className="text-2xl font-bold tracking-wider">{race.to.code}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FlightCard
