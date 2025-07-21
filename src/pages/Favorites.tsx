import FlightCard from '@components/FlightCard'
import type { FC } from 'react'
import { useAppSelector } from '../store/hooks'
import { races } from '../races'

const Favorites: FC = () => {
  const favoritesIds = useAppSelector(state => state.favorites.favoriteFlights)

  const favorites = races.filter(race => favoritesIds.includes(race.airline))
  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-4 text-2xl text-white">Ваши избранные рейсы</h1>
      {favorites.length === 0 ? (
        <div className="mt-10 text-center text-gray-400">No favorites yet</div>
      ) : (
        favorites.map((race) => (
          <FlightCard key={race.airline} race={race} favorites={favoritesIds} />
        ))
      )}
    </div>
  )
}
export default Favorites
