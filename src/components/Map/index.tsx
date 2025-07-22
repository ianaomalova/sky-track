import { splitRoute } from '@utils/coords'
import type { LatLngExpression } from 'leaflet'
import type { FC } from 'react'
import { useEffect, useMemo } from 'react'
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
import {
  DEFAULT_CENTER,
  ZOOM_LEVEL,
  lightMap,
  darkMap,
  getPlaneIcon,
  getActivePlaneIcon,
} from '@constants/map.constants'

interface Prop {
  races: IFlight[]
  selectedCodeRace: string | null
  progress?: number
}

const MapComponent: FC<Prop> = ({ races, selectedCodeRace, progress }) => {
  const { theme } = useTheme()
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

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer url={tile.url} attribution={tile.attribution} maxZoom={20} />
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
          {currentPosition && (
            <Marker position={currentPosition} icon={getActivePlaneIcon(theme)}>
              <Popup>
                {selectedRace.airline} from {selectedRace.from.city}
              </Popup>
            </Marker>
          )}
        </>
      )}

      <MapUpdater center={center} zoom={ZOOM_LEVEL} />
    </MapContainer>
  )
}

export default MapComponent
