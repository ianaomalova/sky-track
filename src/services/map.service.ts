import * as turf from '@turf/turf'
import type { LineString, Feature } from 'geojson'

export const MapService = {
  splitRoute: (
    points: [number, number][],
    progress: number,
  ): {
    passedPoints: [number, number][]
    remainingPoints: [number, number][]
    currentPosition: [number, number]
  } => {
    if (!points || points.length !== 2) {
      throw new Error('Должно быть ровно две точки для маршрута')
    }

    const [start, end] = points

    // Создаем реалистичный маршрут с выраженным изгибом
    const steps = 100
    const routeCoordinates: [number, number][] = []

    const [startLng, startLat] = start
    const [endLng, endLat] = end

    // Обрабатываем переход через 180° меридиан
    let lngDiff = endLng - startLng
    if (Math.abs(lngDiff) > 180) {
      lngDiff = lngDiff > 0 ? lngDiff - 360 : lngDiff + 360
    }

    // Вычисляем промежуточную точку для создания дуги
    const midLng = startLng + lngDiff * 0.5
    const midLat = (startLat + endLat) * 0.5

    // Добавляем более выраженный изгиб
    const distance = Math.sqrt(
      lngDiff * lngDiff + (endLat - startLat) * (endLat - startLat),
    )

    // Увеличиваем коэффициент изгиба для всех расстояний
    let curveFactor = distance * 0.4 // Увеличен базовый изгиб

    // Минимальный изгиб даже для коротких расстояний
    curveFactor = Math.max(curveFactor, 3)
    // Максимальный изгиб для очень длинных маршрутов
    curveFactor = Math.min(curveFactor, 25)

    // Определяем направление изгиба (всегда к северу для более красивого вида)
    const curveOffset = curveFactor

    for (let i = 0; i <= steps; i++) {
      const t = i / steps

      // Квадратичная кривая Безье с более выраженным изгибом
      const lat =
        (1 - t) * (1 - t) * startLat +
        2 * (1 - t) * t * (midLat + curveOffset) +
        t * t * endLat

      const lng =
        (1 - t) * (1 - t) * startLng +
        2 * (1 - t) * t * midLng +
        t * t * (startLng + lngDiff)

      // Нормализуем долготу
      let normalizedLng = lng
      if (normalizedLng > 180) normalizedLng -= 360
      if (normalizedLng < -180) normalizedLng += 360

      routeCoordinates.push([normalizedLng, lat])
    }

    const line = turf.lineString(routeCoordinates)

    const coordinates = line.geometry.coordinates as [number, number][]
    const totalDistance = turf.length(line, { units: 'kilometers' })
    const targetDistance = totalDistance * progress

    // Находим точку на указанном расстоянии
    const currentPoint = turf.along(line, targetDistance, {
      units: 'kilometers',
    }).geometry.coordinates as [number, number]

    // Находим индекс ближайшей точки на линии
    let insertIndex = 0
    let minDistance = Infinity

    coordinates.forEach((pt, index) => {
      const dist = turf.distance(pt, currentPoint, { units: 'kilometers' })
      if (dist < minDistance) {
        minDistance = dist
        insertIndex = index
      }
    })

    const passedPoints = coordinates.slice(0, insertIndex + 1)
    const remainingPoints = coordinates.slice(insertIndex)

    return {
      passedPoints,
      remainingPoints,
      currentPosition: currentPoint,
    }
  },
}
