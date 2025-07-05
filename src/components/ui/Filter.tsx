import type { FC } from 'react'

const style = {
  width: '100%',
  maxWidth: '380px',
  padding: '12px 20px',
  background: 'linear-gradient(135deg, #253858 0%, #171e2d 100%)',
  border: '2px solid rgba(160, 174, 192, 0.2)',
  borderRadius: '12px',
  color: '#ffffff',
  fontSize: '16px',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  marginBottom: '20px',
}

interface Props {
  value: string
  onChange: (value: string) => void
}

const Filter: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by country or city"
      style={style}
    />
  )
}
export default Filter
