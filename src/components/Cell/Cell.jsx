import React from 'react';
import './Cell.scss';

export const Cell = ({ typeCell, value, stateValueCell, errorCell, onclick }) => {
	const handleValueChange = (event) => {
		const newValue = event.target.value;
		stateValueCell(newValue);
	};

	const handleCheckboxChange = (event) => {
		const newValue = event.target.checked;
		stateValueCell(newValue);
	};

	if (typeCell === 'select') {
		const selectOptions = JSON.parse(localStorage.getItem('selectOption')) || [];
		return (
			<select
				className={`cell__app ${errorCell ? 'error' : ''}`}
				value={value}
				onChange={handleValueChange}
			>
				{selectOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	} else if (typeCell === 'checkbox') {
		return (
			<input
				className={`cell__app ${errorCell ? 'error' : ''}`}
				type="checkbox"
				checked={value}
				onChange={handleCheckboxChange}
				onClick={onclick}
			/>
		);
	} else {
		return (
			<input
				className={`cell__app ${errorCell ? 'error' : ''}`}
				type={typeCell}
				value={value}
				onChange={handleValueChange}
				onClick={onclick}
			/>
		);
	}
};
