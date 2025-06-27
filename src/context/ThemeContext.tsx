import { createContext, useContext, useEffect, useState, type FC } from 'react'

interface IContextTheme {
	theme: 'light' | 'dark'
	toggleTheme: () => void
}

const ThemeContext = createContext<IContextTheme>({
	theme: 'light',
	toggleTheme: () => {
		console.warn('ThemeContext used outside of ThemeProvider')
	},
})

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
		return 'light'
	})

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}

		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)
