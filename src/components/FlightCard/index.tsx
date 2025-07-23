import { useAppDispatch, useAppSelector } from '@store/hooks'
import { toggleFavorite } from '@store/slices/flights/flights.slice'
import type { IFlight } from '@shared_types/race.interface'
import GradientProgress from '@ui/GradientProgress'
import { Heart } from 'lucide-react'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface CardProp {
  race: IFlight
  openDetails?: () => void
  updateQueryParam?: (value: string) => void
}

const FlightCard: FC<CardProp> = ({ race, openDetails, updateQueryParam }) => {
  const favorites = useAppSelector((state) => state.flights.favoriteFlights)
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const flight = searchParams.get('flight')

  function clickCard() {
    if (openDetails && updateQueryParam) {
      updateQueryParam(race.airline)
      openDetails()
    }
  }

  const toggleFavorites = (id: string) => {
    const isAlreadyFavorite = favorites.includes(id)
    dispatch(toggleFavorite(id))
    toast.success(
      isAlreadyFavorite
        ? 'Рейс успешно удален из избранного!'
        : 'Рейс успешно добавлен в избранное!',
      {
        position: 'top-right',
        autoClose: 2000,
      },
    )
  }

  const isFavorite = favorites?.includes(race.airline)

  return (
    <div
      className={`relative z-10 mb-3 w-[380px] rounded-2xl p-[2px] ${
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
              className={`hover:scale-130 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorites(race.airline)
              }}
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
