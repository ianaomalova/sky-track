import { Plane } from 'lucide-react'
import type { FC } from 'react'

interface Prop {
	progress: number
}

const GradientProgress: FC<Prop> = ({ progress }) => {
	return (
		<div className='relative'>
			<div className='border-gradient h-0.5 rounded-full'></div>
			<Plane
				className='absolute top-1/2 transform'
				style={{
					left: `${progress}%`,
					transform: 'translate(-50%, -50%) rotate(45deg)',
					fill: 'white',
				}}
				size={20}
			/>
		</div>
	)
}
export default GradientProgress
