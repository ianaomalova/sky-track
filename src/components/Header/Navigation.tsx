import { NAV_CONFIG } from '@config/nav.config'
import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

const navCommon =
  'rounded-lg px-3 py-1 transition-all duration-200 hover:bg-white/10 dark:hover:bg-gray-200'

const active =
  'text-orange bg-white/20 font-semibold shadow-sm dark:bg-gray-200 dark:text-orange-500'

const inActive = 'text-white dark:text-black'

const Navigation: FC = () => {
  return (
    <nav className="sm:hidden">
      <ul className="flex items-center gap-5">
        {NAV_CONFIG.map((link) => {
          return (
            <li key={link.to}>
              <NavLink
                className={({ isActive }) =>
                  ` ${navCommon} ${isActive ? `${active}` : `${inActive}`}`
                }
                to={link.to}
              >
                {link.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
export default Navigation
