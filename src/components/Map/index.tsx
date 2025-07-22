import { splitRoute } from '@utils/coords'
import type { LatLngExpression } from 'leaflet'
import L from 'leaflet'
import type { FC } from 'react'
import { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import type { IFlight } from 'types/race.interface'
import planeIconImg from '/public/blue-plane.svg'
import activePlaneIconImg from '/public/color-plane.svg'
import { useTheme } from '../../context/ThemeContext'

interface Prop {
  races: IFlight[]
  selectedCodeRace: string | null
  progress?: number
}
const MapComponent: FC<Prop> = ({ races, selectedCodeRace }) => {
  const { theme } = useTheme()
  const selectedRace = races.find((race) => race.airline === selectedCodeRace)
  const center: LatLngExpression = selectedRace?.from.coords ?? [
    55.75396, 37.620393,
  ]

  let passedPoints: LatLngExpression[] = []
  let remainingPoints: LatLngExpression[] = []
  let currentPosition: LatLngExpression | null = null

  if (selectedRace) {
    const split = splitRoute(
      [selectedRace?.from.coords, selectedRace?.to.coords],
      0.35,
    )
    passedPoints = split.passedPoints
    remainingPoints = split.remainingPoints
    currentPosition = split.currentPosition
  }

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

  const planeIcon = L.icon({
    iconUrl:
      theme === 'dark' ? '/public/gray-plane.svg' : '/public/color-plane.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })

  const activePlaneIcon = L.icon({
    iconUrl:
      theme === 'dark' ? '/public/plane-marker.svg' : '/public/blue-plane.svg',
    iconSize: [26, 26],
    iconAnchor: [18, 18],
  })

  const lightMap = {
    url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }

  const darkMap = {
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
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
            icon={planeIcon}
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
            <Marker position={currentPosition} icon={activePlaneIcon}>
              <Popup>
                {selectedRace.airline} from {selectedRace.from.city}
              </Popup>
            </Marker>
          )}
        </>
      )}

      <MapUpdater center={center} zoom={4} />
    </MapContainer>
  )
}

export default MapComponent
