import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Logo: FC = () => {
  return (
    <NavLink to={'/'}>
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
    </NavLink>
  )
}
export default Logo
