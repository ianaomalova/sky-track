import ThemeToggle from '@components/ui/ThemeToggle'
import { Heart, Menu, X } from 'lucide-react'
import { useState, type FC } from 'react'
import { NavLink } from 'react-router-dom'

const header =
  'mx-auto mt-5 max-w-250 rounded-2xl bg-gradient-to-r from-gray-900 via-sky-800 to-gray-900 dark:from-blue-100 dark:via-sky-200 dark:to-blue-100 sm:p-5 py-2 px-3 shadow-xl opacity-90'
export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className={header}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm dark:bg-gray-300">
            <svg
              className="h-5 w-5 text-white dark:text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <div className="text-white dark:text-black">
            <h1 className="text-xl font-bold tracking-tight">SkyTrack</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sm:hidden">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1 transition-all duration-200 hover:bg-white/10 dark:hover:bg-gray-200 ${
                    isActive
                      ? 'text-orange bg-white/20 font-semibold shadow-sm dark:bg-gray-200 dark:text-orange-500'
                      : 'text-white dark:text-black'
                  }`
                }
                to={'/'}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1 transition-all duration-200 hover:bg-white/10 dark:hover:bg-gray-200 ${
                    isActive
                      ? 'text-orange bg-white/20 font-semibold shadow-sm dark:bg-gray-200 dark:text-orange-500'
                      : 'text-white dark:text-black'
                  }`
                }
                to={'/races'}
              >
                Races
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1 transition-all duration-200 hover:bg-white/10 dark:hover:bg-gray-200 ${
                    isActive
                      ? 'text-orange bg-white/20 font-semibold shadow-sm dark:bg-gray-200 dark:text-orange-500'
                      : 'text-white dark:text-black'
                  }`
                }
                to={'/about'}
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5 sm:hidden">
          <Heart
            size={30}
            className="cursor-pointer text-rose-700 dark:text-red-600"
          />
          <ThemeToggle />
        </div>
        <button
          onClick={toggleMenu}
          className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm sm:visible sm:flex dark:border-gray-400 dark:bg-gray-300"
        >
          {isMenuOpen ? (
            <X strokeWidth={1.25} size={21} className="text-white/50" />
          ) : (
            <Menu strokeWidth={1.25} size={21} className="text-white/50" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="mt-4 border-t border-white/20 pt-4 dark:border-gray-400/30">
          <nav>
            <ul>
              <li>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-white transition-all duration-200 dark:text-black"
                  to={'/'}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-white transition-all duration-200 dark:text-black"
                  to={'races'}
                >
                  Races
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-white transition-all duration-200 dark:text-black"
                  to={'about'}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="mt-4 flex items-center justify-center gap-3 border-t border-white/20 pt-4 dark:border-gray-400/30">
            <Heart
              size={30}
              className="cursor-pointer text-rose-700 dark:text-red-600"
            />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
