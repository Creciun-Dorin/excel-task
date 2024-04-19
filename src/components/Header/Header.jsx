import React from "react";
import { Button } from "../Button/Button";
import { AddSquare } from "../Icon/AddSquare";
import { Send } from "../Icon/Send";
import "./Header.scss";

export const Header = ({ popUp, setPopUp, columns, setColumns, setErrorCell }) => {
	// Function to toggle the modal (open/close)
	const closeOpenModal = () => {
		setPopUp(!popUp); // Toggle the state of popUp
	};

	// Function to handle table sending
	const sendTable = () => {
		if (columns.length > 0) {
			let allFilled = true;
			let updatedColumns = [...columns];

			// Check each column for mandatory cell completion
			updatedColumns.forEach((column, columnIndex) => {
				const isObligatory = column.columnObligatory;
				const incompleteCells = column.data.some((cell) => cell.value.trim() === '');

				if (isObligatory && incompleteCells) {
					allFilled = false;
					// Set error for each empty cell in this column
					const updatedData = column.data.map((cell) => ({
						...cell,
						error: cell.value.trim() === '',
					}));
					// Update the corresponding column in the updated columns list
					updatedColumns[columnIndex] = { ...column, data: updatedData };
				}
			});

			if (!allFilled) {
				// Display a message or return to prevent table sending
				console.log("There are incomplete cells in mandatory columns.");
				setErrorCell(true); // Set the general error flag for incomplete columns
				setColumns(updatedColumns); // Update columns with errors
				localStorage.setItem("columns", JSON.stringify(updatedColumns));
				return;
			}

			console.log("Sending the completed table:", updatedColumns);

			// Clear localStorage data and reset state
			setColumns([]); // Reset columns to empty array
			localStorage.removeItem("columns"); // Remove columns data from localStorage
			localStorage.removeItem("numberCells"); // Remove numberCells data from localStorage
			setErrorCell(false); // Reset the general error flag
		}
	};

	return (
		<header className="header__app">
			<span className="header__app__logo">table</span>
			<div className="header__app__grup">
				<Button eventClick={closeOpenModal} description="New columns" className="button__add" svg={<AddSquare />} />
				<Button eventClick={sendTable} description="Send table" className="button__add" svg={<Send />} />
			</div>
		</header>
	);
};
