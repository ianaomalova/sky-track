import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, type FC } from 'react'
import Logo from './Logo'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import ThemeToggle from '@components/ui/ThemeToggle'

const header =
  'relative z-10 mx-auto mt-5 max-w-250 rounded-2xl bg-gradient-to-r from-gray-900 via-sky-800 to-gray-900 dark:from-blue-100 dark:via-sky-200 dark:to-blue-100 sm:p-5 py-2 px-3 shadow-xl opacity-90'
export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className={header}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desctop Navigation */}
        <Navigation />

        {/* Actions */}
        <div className="flex items-center gap-5 sm:hidden">
          <ThemeToggle />
        </div>

        {/* Buttons for toggle mobile nav */}
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

      {/* Mobile Navigation */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ overflow: 'hidden' }}
          >
            <MobileNavigation setIsMenuOpen={setIsMenuOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
