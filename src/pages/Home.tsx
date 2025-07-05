import FlightCard from '@components/FlightCard'
import FlightDetails from '@components/FlightDetails'
import Filter from '@components/ui/Filter'
import { Modal } from '@components/ui/Modal'
import { QUERY_PARAM_FLIGHT } from '@constants/flight.constants'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState, type FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSearchParams } from 'react-router-dom'
import { races } from '../races'

const Home: FC = () => {
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  function closeDetails() {
    setIsShowDetails(false)
    searchParams.delete(QUERY_PARAM_FLIGHT)
    setSearchParams(searchParams)
  }

  function openDetails() {
    setIsShowDetails(true)
  }

  function updateQueryParam(value: string) {
    searchParams.set(QUERY_PARAM_FLIGHT, value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const store = localStorage.getItem('favorites')
    if (store) {
      try {
        const parsed = JSON.parse(store)
        setFavorites(Array.isArray(parsed) ? parsed : [])
      } catch (e) {
        console.error('Cannot parsed local storage', e)
        setFavorites([])
      }
    }
  }, [])

  const toggleFavorites = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((el) => el !== id)
        : [...prev, id]
      try {
        localStorage.setItem('favorites', JSON.stringify(updated))
      } catch (e) {
        console.error('Ошибка сохранения в local storage', e)
      }

      return updated
    })
  }

  const filteredRaces = races.filter((race) => {
    return (
      race.flightInfo.country.toLowerCase().includes(filter.toLowerCase()) ||
      race.from.city.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <>
      <div className="flex items-start justify-between px-5 pt-5 md:justify-center">
        <div>
          <Filter value={filter} onChange={setFilter} />
          {filteredRaces.map((race) => (
            <FlightCard
              key={race.aircraftReg}
              race={race}
              openDetails={openDetails}
              updateQueryParam={updateQueryParam}
              toggleFavorite={toggleFavorites}
              favorites={favorites}
            />
          ))}
        </div>

        <AnimatePresence>
          {isShowDetails && (
            <>
              {isMobile ? (
                <Modal isOpen={isShowDetails} onClose={closeDetails}>
                  <FlightDetails closeDetails={closeDetails} isMobile />
                </Modal>
              ) : (
                <FlightDetails closeDetails={closeDetails} />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
export default Home
