import { getActivePlaneIcon, redMarkerIcon } from '@constants/map.constants'
import type { IFlight } from '@shared_types/race.interface'
import type { FC } from 'react'
import { Marker, Polyline, Popup } from 'react-leaflet'

interface Prop {
  passedPoints: [number, number][]
  remainingPoints: [number, number][]
  currentPosition: [number, number] | null
  selectedRace: IFlight
  theme: string
}

const SelectedRace: FC<Prop> = ({
  passedPoints,
  remainingPoints,
  currentPosition,
  selectedRace,
  theme,
}) => {
  return (
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
        <Marker position={currentPosition} icon={getActivePlaneIcon(theme)}>
          <Popup>
            {selectedRace.airline} from {selectedRace.from.city}
          </Popup>
        </Marker>
      )}
    </>
  )
}
export default SelectedRace
