import FlightCard from '@components/FlightCard'
import { races } from '../races'
import type { FC } from 'react'

const Favorites: FC = () => {
  const favoriteIds = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  ) as string[]

  const favoriteRaces = races.filter((race) =>
    favoriteIds.includes(race.airline),
  )

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-4 text-2xl text-white">Ваши избранные рейсы</h1>
      {favoriteRaces.length === 0 ? (
        <div className="mt-10 text-center text-gray-400">No favorites yet</div>
      ) : (
        favoriteRaces.map((race) => (
          <FlightCard key={race.airline} race={race} />
        ))
      )}
    </div>
  )
}
export default Favorites
