import type { LatLngExpression } from 'leaflet'
import L from 'leaflet'
import type { FC } from 'react'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { IFlight } from 'types/race.interface'
import planeIconImg from '/public/plane-marker.svg'

interface Prop {
  races: IFlight[]
  selectedCodeRace: string | null
}
const MapComponent: FC<Prop> = ({ races, selectedCodeRace }) => {
  const selectedRace = races.find((race) => race.airline === selectedCodeRace)
  const center: LatLngExpression = selectedRace?.from.coords ?? [1, 2]

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
    iconUrl: planeIconImg,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {races.map((race) => (
        <Marker key={race.airline} position={race.from.coords} icon={planeIcon}>
          <Popup>
            {race.airline} from {race.from.city}
          </Popup>
        </Marker>
      ))}
      <MapUpdater center={center} zoom={4} />
    </MapContainer>
  )
}

export default MapComponent
