import type { FC } from 'react'

interface Prop {
  error: string
  onRetry: () => void
}

const ErrorComponent: FC<Prop> = ({ error, onRetry }) => {
  return (
    <div className={`flex items-center justify-center py-8`}>
      <div className="text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mb-2 text-lg font-medium text-gray-500">
          Что-то пошло не так
        </h3>
        <p className="mb-4 max-w-sm text-gray-600">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
export default ErrorComponent
