import React, { useState } from 'react';
import './Modal.scss';
import { Button } from '../Button/Button';
import { AddSquare } from '../Icon/AddSquare';
import { SelectOptionList } from '../SelectOptionList/SelectOptionList';

export const Modal = ({ popUp, setPopUp, columns, setColumns, numberCells }) => {
	// State variables to manage modal inputs
	const [typeSelect, setTypeSelect] = useState('text');
	const [inputSelect, setInputSelect] = useState('');
	const [title, setTitle] = useState('');
	const [selectOption, setSelectOption] = useState(JSON.parse(localStorage.getItem('selectOption')) || []);
	const [columnObligatory, setColumnObligatory] = useState(false);

	// Event handler for title input change
	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	// Event handler for column type selection change
	const changeSelect = (event) => {
		setTypeSelect(event.target.value);
	};

	// Event handler to create a new option for select type columns
	const createOption = (e) => {
		e.preventDefault();
		if (inputSelect.length > 0) {
			setSelectOption([...selectOption, inputSelect]);
			localStorage.setItem('selectOption', JSON.stringify([...selectOption, inputSelect]));
		}
	};

	// Event handler to create a new column
	const createColumn = () => {
		// Validate select type columns to ensure at least two options are provided
		if (typeSelect === 'select' && selectOption.length < 2) {
			alert("You must add at least two options to create a 'select' type column.");
			return;
		}

		// Create a new column object based on modal inputs
		const newColumn = {
			title: title,
			columnObligatory: columnObligatory,
			data: []
		};

		// Populate column data based on column type
		if (typeSelect === 'select' && selectOption.length > 0) {
			for (let i = 0; i < numberCells; i++) {
				const newCell = {
					value: selectOption[0], // Default value from the first option
					typeCell: typeSelect,
					selectOption: selectOption
				};
				newColumn.data.push(newCell);
			}
		} else {
			for (let i = 0; i < numberCells; i++) {
				const newCell = {
					value: '', // Default empty value
					typeCell: typeSelect
				};
				newColumn.data.push(newCell);
			}
		}

		// Update columns state with the new column
		setColumns([...columns, newColumn]);

		// Update localStorage with the updated columns
		localStorage.setItem('columns', JSON.stringify([...columns, newColumn]));

		// Close the modal by toggling the popUp state
		setPopUp(!popUp);
	};

	return (
		<form className="modal__window__app">
			<div className="modal__window__app__group">
				<label className="modal__window__app__group__label">Column name</label>
				<input
					className="modal__window__app__group__input"
					type="text"
					placeholder="Write column name"
					value={title}
					onChange={handleTitleChange}
				/>
			</div>
			<div className="modal__window__app__group">
				<label className="modal__window__app__group__label">Select column type</label>
				<select className="modal__window__app__group__select" onChange={changeSelect}>
					<option value="text">text</option>
					<option value="number">number</option>
					<option value="email">email</option>
					<option value="checkbox">boolean</option>
					<option value="select">select</option>
				</select>
				{/* Render additional options for 'select' type columns */}
				{typeSelect === 'select' && (
					<div className="modal__select__option">
						<ol className="select__option__list">
							{/* Render existing select options */}
							{selectOption.map((item, index) => (
								<SelectOptionList
									key={index}
									nameList={item}
									index={index}
									selectOption={selectOption}
									setSelectOption={setSelectOption}
								/>
							))}
						</ol>
						<div className="modal__select__option__group">
							<input
								type="text"
								value={inputSelect}
								onChange={(e) => setInputSelect(e.target.value)}
							/>
							<Button
								eventClick={createOption}
								description="Add option"
								className="button__add"
								svg={<AddSquare />}
							/>
						</div>
					</div>
				)}
			</div>
			{/* Checkbox to mark column as obligatory */}
			<div className="modal__window__app__group">
				<input
					type="checkbox"
					name="checkbox"
					checked={columnObligatory}
					onChange={() => setColumnObligatory(!columnObligatory)}
				/>
				<label htmlFor="checkbox">Mandatory fill in the cells</label>
			</div>
			{/* Button to create the column */}
			<Button eventClick={createColumn} className="button__add" description="Create column" />
		</form>
	);
};
