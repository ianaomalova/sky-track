import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Favorites from '@pages/Favorites'

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  )
}
