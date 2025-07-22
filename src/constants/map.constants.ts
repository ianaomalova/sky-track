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
    iconUrl:
      theme === 'dark' ? '/public/gray-plane.svg' : '/public/color-plane.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })

export const getActivePlaneIcon = (theme: string) =>
  L.icon({
    iconUrl:
      theme === 'dark' ? '/public/plane-marker.svg' : '/public/blue-plane.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  })

export const redMarkerIcon = new L.Icon({
  iconUrl: '/public/placeholder.png',
  iconSize: [24, 24],
  iconAnchor: [12, 22],
})
