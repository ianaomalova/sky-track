import {
  DEFAULT_CENTER,
  ZOOM_LEVEL,
  darkMap,
  getActivePlaneIcon,
  getPlaneIcon,
  lightMap,
  redMarkerIcon,
} from '@constants/map.constants'
import { splitRoute } from '@utils/coords'
import type { LatLngExpression } from 'leaflet'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import type { IFlight } from 'types/race.interface'
import { useTheme } from '../../context/ThemeContext'

interface Prop {
  races: IFlight[]
  selectedCodeRace: string | null
  progress?: number
}

const MapComponent: FC<Prop> = ({ races, selectedCodeRace, progress }) => {
  const { theme } = useTheme()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const selectedRace = races.find((race) => race.airline === selectedCodeRace)
  const center: LatLngExpression = selectedRace?.from.coords ?? DEFAULT_CENTER

  const { passedPoints, remainingPoints, currentPosition } = useMemo(() => {
    if (!selectedRace) {
      return {
        passedPoints: [],
        remainingPoints: [],
        currentPosition: null,
      }
    }

    return splitRoute(
      [selectedRace.from.coords, selectedRace.to.coords],
      progress ? progress : 0.1,
    )
  }, [selectedRace])

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

  if (error) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center text-white">
        <div className="text-2xl">Ошибка загрузки карты</div>
        <div className="text-xl">
          Проверьте соединение или попробуйте позже.
        </div>
      </div>
    )
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1000,
            background: 'rgba(255,255,255,0.9)',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          Загрузка карты...
        </div>
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
            <>
              <Polyline
                positions={passedPoints}
                pathOptions={{ color: 'deepskyblue', weight: 3 }}
              />

              <Polyline
                positions={remainingPoints}
                pathOptions={{
                  color: 'gray',
                  weight: 2,
                  dashArray: '6 6',
                }}
              />
              <Marker position={selectedRace.from.coords} icon={redMarkerIcon}>
                <Popup>Start: {selectedRace.from.city}</Popup>
              </Marker>

              <Marker position={selectedRace.to.coords} icon={redMarkerIcon}>
                <Popup>End: {selectedRace.to.city}</Popup>
              </Marker>
              {currentPosition && (
                <Marker
                  position={currentPosition}
                  icon={getActivePlaneIcon(theme)}
                >
                  <Popup>
                    {selectedRace.airline} from {selectedRace.from.city}
                  </Popup>
                </Marker>
              )}
            </>
          )}

          <MapUpdater center={center} zoom={ZOOM_LEVEL} />
        </MapContainer>
      )}
    </>
  )
}

export default MapComponent
