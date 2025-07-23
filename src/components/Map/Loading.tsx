import type { FC } from 'react'

const Loading: FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1000,
        background: 'rgba(255,255,255,0.9)',
        padding: '1rem',
        borderRadius: '8px',
      }}
    >
      Загрузка карты...
    </div>
  )
}
export default Loading
