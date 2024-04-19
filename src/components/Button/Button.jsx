import './Button.scss'

export const Button = ({eventClick, className, svg, description}) => {
	return (
		<button type='button' onClick={eventClick} className={className}>
			{svg}
			{description}
		</button>
	)
}