import * as turf from '@turf/turf'
import type { LatLngExpression } from 'leaflet'

export function splitRoute(
  points: [number, number][],
  progress: number,
): {
  passedPoints: [number, number][]
  remainingPoints: [number, number][]
  currentPosition: [number, number]
} {
  if (!points || points.length === 0) {
    throw new Error('Массив точек не может быть пустым')
  }
  if (progress < 0 || progress > 1) {
    throw new Error('Прогресс должен быть числом от 0 до 1')
  }

  // Если маршрут состоит из одной точки
  if (points.length === 1) {
    return {
      passedPoints: [...points],
      remainingPoints: [...points],
      currentPosition: points[0],
    }
  }

  // Создаем линию из всех точек маршрута
  const routeLine = turf.lineString(points)
  const totalDistance = turf.length(routeLine, { units: 'kilometers' })
  const targetDistance = totalDistance * progress

  // Находим точку на линии, соответствующую заданному прогрессу
  const targetPoint = turf.along(routeLine, targetDistance, {
    units: 'kilometers',
  })
  const targetCoords = targetPoint.geometry.coordinates as [number, number]

  // Разделяем точки на пройденные и оставшиеся
  let splitIndex = 0
  let accumulatedDistance = 0

  // Находим индекс точки, где нужно разделить маршрут
  for (let i = 1; i < points.length; i++) {
    const segmentDistance = turf.distance(points[i - 1], points[i], {
      units: 'kilometers',
    })
    accumulatedDistance += segmentDistance

    if (accumulatedDistance >= targetDistance) {
      // Рассчитываем точное положение разделения между points[i-1] и points[i]
      const overshoot = accumulatedDistance - targetDistance
      const ratio = overshoot / segmentDistance
      const interpolatedPoint = interpolate(points[i - 1], points[i], 1 - ratio)

      splitIndex = i
      return {
        passedPoints: [...points.slice(0, i), interpolatedPoint],
        remainingPoints: [interpolatedPoint, ...points.slice(i)],
        currentPosition: interpolatedPoint,
      }
    }
  }

  // Если прогресс = 1 (маршрут завершен)
  return {
    passedPoints: [...points],
    remainingPoints: [points[points.length - 1]],
    currentPosition: points[points.length - 1],
  }
}

// Вспомогательная функция для интерполяции между точками
function interpolate(
  pointA: [number, number],
  pointB: [number, number],
  ratio: number,
): [number, number] {
  return [
    pointA[0] + (pointB[0] - pointA[0]) * ratio,
    pointA[1] + (pointB[1] - pointA[1]) * ratio,
  ]
}
