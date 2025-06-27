import './App.css'
import ThemeToggle from './components/ui/ThemeToggle'
import { MainRoutes } from './router/router'

function App() {
	return (
		<div className='relative'>
			<div className='absolute left-1/2'>
				<ThemeToggle />
			</div>
			<MainRoutes />
		</div>
	)
}

export default App
