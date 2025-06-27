import { MoonStar, Sun } from 'lucide-react'
import type { FC } from 'react'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle: FC = () => {
	const { theme, toggleTheme } = useTheme()
	return (
		<>
			{theme === 'dark' ? (
				<button
					className='w-10 h-10 bg-white rounded-full cursor-pointer flex items-center justify-center'
					onClick={toggleTheme}
				>
					<MoonStar color='black' />
				</button>
			) : (
				<button
					className='w-10 h-10 bg-gray-900 rounded-full cursor-pointer flex items-center justify-center'
					onClick={toggleTheme}
				>
					<Sun color='yellow' />
				</button>
			)}
		</>
	)
}
export default ThemeToggle
