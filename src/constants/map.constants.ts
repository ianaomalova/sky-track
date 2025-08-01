import L from 'leaflet'

export const DEFAULT_CENTER: L.LatLngExpression = [55.75396, 37.620393]
export const ZOOM_LEVEL = 4

export const lightMap = {
  url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
  attribution:
    '© <a href="https://www.stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a>, © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}

export const darkMap = {
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  attribution:
    '© <a href="https://www.stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a>, © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}

export const getPlaneIcon = (theme: string) =>
  L.icon({
    iconUrl: theme === 'dark' ? '/gray-plane.svg' : '/color-plane.svg',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

export const getActivePlaneIcon = () =>
  L.icon({
    iconUrl: '/public/circle.png',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })

export const redMarkerIcon = new L.Icon({
  iconUrl: '/placeholder.png',
  iconSize: [24, 24],
  iconAnchor: [12, 22],
})
