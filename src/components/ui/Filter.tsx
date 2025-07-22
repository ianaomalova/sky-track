import type { FC } from 'react'

const input =
  'relative z-10 mb-3 w-full max-w-sm rounded-xl border-2 border-blue-400/40 bg-slate-800 px-5 py-3 text-white placeholder-blue-200 transition-all duration-300 outline-none hover:border-blue-300/60 focus:border-blue-200/80 ' +
  'dark:border-indigo-400/40 dark:bg-indigo-50 dark:text-black dark:placeholder-indigo-500 dark:hover:border-indigo-300/60 dark:focus:border-indigo-200/80'
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
      className={`${input}`}
    ></input>
  )
}
export default Filter
