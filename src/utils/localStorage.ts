import { FAVORITES_LOCAL_STORAGE } from '@constants/flight.constants'

export const loadFavorites = (): string[] => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_LOCAL_STORAGE)
    if (storedFavorites) {
      const parsed = JSON.parse(storedFavorites)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (e) {
    console.error('Ошибка при загрузке избранного из localStorage', e)
  }
  return []
}

export const saveFavorites = (favorites: string[]) => {
  try {
    localStorage.setItem(FAVORITES_LOCAL_STORAGE, JSON.stringify(favorites))
  } catch (e) {
    console.error('Ошибка сохранения в localStorage', e)
  }
}