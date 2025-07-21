import FlightCard from '@components/FlightCard'
import { selectFavoriteFlights, selectFlights } from '@store/slices/flightSlice'
import type { FC } from 'react'
import { useAppSelector } from '../../store/hooks'

const Favorites: FC = () => {
  const favoritesIds = useAppSelector(selectFavoriteFlights)
  const races = useAppSelector(selectFlights)

  const favorites = races.filter((race) => favoritesIds.includes(race.airline))

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-4 text-2xl text-white">Ваши избранные рейсы</h1>
      {favorites.length === 0 ? (
        <div className="mt-10 text-center text-gray-400">No favorites yet</div>
      ) : (
        favorites.map((race) => <FlightCard key={race.airline} race={race} />)
      )}
    </div>
  )
}
export default Favorites
