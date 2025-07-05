import { NAV_CONFIG } from '@config/nav.config'
import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Actions from './Actions'

interface Prop {
  setIsMenuOpen: (a: boolean) => void
}

const MobileNavigation: FC<Prop> = ({ setIsMenuOpen }) => {
  return (
    <div className="mt-4 border-t border-white/20 pt-4 dark:border-gray-400/30">
      <nav>
        <ul>
          {NAV_CONFIG.map((link) => {
            return (
              <li>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-white transition-all duration-200 dark:text-black"
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-4 flex items-center justify-center gap-3 border-t border-white/20 pt-4 dark:border-gray-400/30">
        <Actions setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  )
}
export default MobileNavigation
