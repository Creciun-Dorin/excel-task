import React, { useState } from "react";
import { Cell } from "../Cell/Cell";
import { Button } from "../Button/Button";
import { Trash } from "../Icon/Trash";
import "./Column.scss";

export const Column = ({ title, data, columns, setColumns, index, setLastClickedCellIndex }) => {
	// State to manage the column title
	const [columnTitle, setColumnTitle] = useState(title);

	// Function to handle title change
	const changeTitle = (event) => {
		const newTitle = event.target.value;
		setColumnTitle(newTitle);

		// Update the column title in the columns array
		const updatedColumns = [...columns];
		updatedColumns[index].title = newTitle;
		setColumns(updatedColumns);

		// Update localStorage with the updated columns
		localStorage.setItem("columns", JSON.stringify(updatedColumns));
	};

	// Function to handle cell value change
	const handleCellValueChange = (cellIndex, newValue) => {
		const updatedData = [...data];
		const isError = newValue.trim() === "";

		// Update the specific cell's value and error status
		updatedData[cellIndex] = {
			...updatedData[cellIndex],
			value: newValue,
			error: isError
		};

		// Update the column data in the columns array
		const updatedColumns = [...columns];
		updatedColumns[index].data = updatedData;
		setColumns(updatedColumns);

		// Update localStorage with the updated columns
		localStorage.setItem("columns", JSON.stringify(updatedColumns));
	};

	// Function to delete the entire column
	const deleteColumn = () => {
		// Filter out the column at the specified index
		const updatedColumns = columns.filter((_, idx) => idx !== index);
		setColumns(updatedColumns);

		// Update localStorage with the updated columns
		localStorage.setItem("columns", JSON.stringify(updatedColumns));
	};

	return (
		<div className="column__app">
			{/* Input field to edit the column title */}
			<input
				className="column__app-title"
				type="text"
				value={columnTitle}
				onChange={changeTitle}
				placeholder="Column name"
			/>

			{/* Render cells inside the column */}
			<div className="column__app-cell">
				{data.map((element, cellIndex) => (
					<Cell
						key={cellIndex}
						typeCell={element.typeCell || "text"}
						value={element.value}
						stateValueCell={(newValue) => {
							handleCellValueChange(cellIndex, newValue);
						}}
						index={cellIndex}
						errorCell={element.error}
						onclick={() => setLastClickedCellIndex(cellIndex)}
					/>
				))}
			</div>

			{/* Button to delete the entire column */}
			<Button
				eventClick={deleteColumn}
				className="button__delete"
				svg={<Trash />}
				description="Delete Column"
			/>
		</div>
	);
};
