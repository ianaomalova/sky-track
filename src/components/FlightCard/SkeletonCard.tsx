import type { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard: FC = () => {
  return (
    <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
      <div className="mb-3 w-[380px] rounded-2xl p-[2px]">
        <div className="mx-auto h-[180px] w-full rounded-2xl bg-gray-900 p-6 text-white dark:bg-white dark:text-gray-950">
          <div className="mb-8 flex items-center justify-between">
            <Skeleton width={325} height={30} />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <Skeleton width={64} height={16} className="mb-1" />
              <Skeleton width={48} height={24} />
            </div>

            <div className="mx-5 flex-1">
              <Skeleton height={4} />
            </div>

            <div className="text-center">
              <Skeleton width={64} height={16} className="mb-1" />
              <Skeleton width={48} height={24} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}
export default SkeletonCard
