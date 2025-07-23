import { type FC } from 'react'

const Error: FC = () => {
  return (
    <div className="mt-40 flex flex-col items-center justify-center text-white">
      <div className="text-2xl">Ошибка загрузки карты</div>
      <div className="text-xl">
        Проверьте соединение или попробуйте позже.
      </div>
    </div>
  )
}

export default Error