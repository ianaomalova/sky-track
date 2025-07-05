import ThemeToggle from '@components/ui/ThemeToggle'
import { Heart } from 'lucide-react'
import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface Prop {
  setIsMenuOpen?: (a: boolean) => void
}

const Actions: FC<Prop> = ({ setIsMenuOpen }) => {
  return (
    <>
      <NavLink to={'/favorites'}>
        {({ isActive }) => (
          <Heart
            className={
              `cursor-pointer transition-colors duration-200 ` +
              (isActive
                ? 'fill-white text-white dark:fill-red-600 dark:text-red-600'
                : 'fill-none text-white dark:fill-none dark:text-red-600')
            }
            strokeWidth={1.25}
            size={28}
            fill={isActive ? 'white' : 'none'}
            onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
          />
        )}
      </NavLink>
      <ThemeToggle />
    </>
  )
}
export default Actions
