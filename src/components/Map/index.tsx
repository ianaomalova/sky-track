import {
  ZOOM_LEVEL,
  darkMap,
  getPlaneIcon,
  lightMap,
} from '@constants/map.constants'
import type { IFlight } from '@shared_types/race.interface'
import type { LatLngExpression } from 'leaflet'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useTheme } from '../../context/ThemeContext'
import Error from './Error'
import Loading from './Loading'
import SelectedRace from './SelectedRace'
import { useMapLogic } from './useMapLogic'

interface Prop {
  races: IFlight[]
  selectedCodeRace: string | null
  progress?: number
}

const MapComponentContainer: FC<Prop> = ({
  races,
  selectedCodeRace,
  progress = 0.4,
}) => {
  const { theme } = useTheme()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const {
    center,
    selectedRace,
    passedPoints,
    remainingPoints,
    currentPosition,
  } = useMapLogic(races, selectedCodeRace, progress)

  const MapUpdater = ({
    center,
    zoom,
  }: {
    center: LatLngExpression
    zoom: number
  }) => {
    const map = useMap()
    useEffect(() => {
      map.setView(center, zoom, { animate: true })
    }, [center, zoom, map])
    return null
  }

  const tile = theme === 'dark' ? lightMap : darkMap

  const handleTileLoad = () => {
    setLoading(false)
  }

  const handleTileError = () => {
    setLoading(false)
    setError(true)
  }

  if (error) return <Error />

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: '100vh', width: '100vw' }}
        >
          <TileLayer
            eventHandlers={{
              tileload: handleTileLoad,
              tileerror: handleTileError,
            }}
            url={tile.url}
            attribution={tile.attribution}
            maxZoom={20}
          />
          {races.map((race) =>
            race.airline === selectedCodeRace ? null : (
              <Marker
                key={race.airline}
                position={race.from.coords}
                icon={getPlaneIcon(theme)}
              >
                <Popup>
                  {race.airline} from {race.from.city}
                </Popup>
              </Marker>
            ),
          )}

          {selectedRace && (
            <SelectedRace
              passedPoints={passedPoints}
              remainingPoints={remainingPoints}
              currentPosition={currentPosition}
              selectedRace={selectedRace}
              theme={theme}
            />
          )}

          <MapUpdater center={center} zoom={ZOOM_LEVEL} />
        </MapContainer>
      )}
    </>
  )
}

export default MapComponentContainer
