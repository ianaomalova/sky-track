import { Ellipsis, Route, Share2, Target } from 'lucide-react'
import type { FC } from 'react'

export const Actions: FC = () => {
  return (
    <div className="mt-3 grid grid-cols-4 rounded-xl bg-gray-800 dark:bg-white">
      <div className="border-r-2 border-gray-900 p-3 dark:border-gray-200">
        <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
          <Route />
          <p>Route</p>
        </button>
      </div>
      <div className="border-r-2 border-l-2 border-gray-900 p-3 dark:border-gray-200">
        <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
          <Target />
          <p>Follow</p>
        </button>
      </div>
      <div className="border-r-2 border-l-2 border-gray-900 p-3 dark:border-gray-200">
        <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
          <Share2 />
          <p>Share</p>
        </button>
      </div>
      <div className="border-l-2 border-gray-900 p-3 dark:border-gray-200">
        <button className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-2">
          <Ellipsis />
          <p>More</p>
        </button>
      </div>
    </div>
  )
}
