import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { Column } from "./components/Column/Column";
import { Empty } from "./components/Empty/Empty";
import { Button } from "./components/Button/Button";
import { AddSquare } from "./components/Icon/AddSquare";
import { Trash } from "./components/Icon/Trash";

export const App = () => {
	// Component states
	const [popUp, setPopUp] = useState(false); // State for controlling modal visibility
	const [columns, setColumns] = useState(JSON.parse(localStorage.getItem("columns")) || []); // State for storing columns
	const [numberCells, setNumberCells] = useState(JSON.parse(localStorage.getItem("numberCells")) || 19); // State for the number of cells
	const [errorCell, setErrorCell] = useState(false); // State for tracking cell validation errors
	const [lastClickedCellIndex, setLastClickedCellIndex] = useState(null); // State for tracking the last clicked cell index

	// Function to add a row to columns
	const handleAddRowToColumns = () => {
		const updatedNumberCells = numberCells + 1;
		setNumberCells(updatedNumberCells);
		localStorage.setItem("numberCells", updatedNumberCells);

		const updatedColumns = columns.map((column) => {
			const newCells = [...column.data];
			const newCellType = newCells.length > 0 ? newCells[0].typeCell : "text";
			newCells.push({ value: "", typeCell: newCellType });

			return { ...column, data: newCells };
		});

		setColumns(updatedColumns);
		localStorage.setItem("columns", JSON.stringify(updatedColumns));
	};

	// Function to delete a row from columns
	const deleteRow = () => {
		if (lastClickedCellIndex !== null) {
			const updatedColumns = columns.map((column) => {
				const updatedData = column.data.filter((_, idx) => idx !== lastClickedCellIndex);
				return { ...column, data: updatedData };
			});

			const remainingCells = updatedColumns[0].data.length;
			setNumberCells(remainingCells);
			localStorage.setItem("numberCells", remainingCells);

			setColumns(updatedColumns);
			setLastClickedCellIndex(null);
			localStorage.setItem("columns", JSON.stringify(updatedColumns));
		}
	};

	return (
		<div className="wrapper">
			{/* Application Header */}
			<Header
				popUp={popUp}
				setPopUp={setPopUp}
				columns={columns}
				setColumns={setColumns}
				setErrorCell={setErrorCell}
				numberCells={numberCells}
			/>

			{/* Main Content */}
			<main className="main__app">
				{/* Render content or empty component */}
				{columns.length === 0 ? (
					<Empty />
				) : (
					columns.map((element, index) => (
						<Column
							key={element.title + index}
							title={element.title}
							typeCell={element.typeCell}
							data={element.data}
							columns={columns}
							setColumns={setColumns}
							index={index}
							errorCell={errorCell}
							setLastClickedCellIndex={setLastClickedCellIndex}
						/>
					))
				)}
			</main>

			{/* Footer with Actions */}
			{columns.length > 0 && (
				<footer className="footer__app">
					<Button
						eventClick={handleAddRowToColumns}
						svg={<AddSquare />}
						className="button__add"
						description="Add Row"
					/>
					{/* Button to delete a row */}
					<Button
						eventClick={deleteRow}
						svg={<Trash />}
						className="button__add"
						description="Delete Row"
					/>
				</footer>
			)}

			{/* Modal Pop-up */}
			{popUp && (
				<Modal
					popUp={popUp}
					setPopUp={setPopUp}
					columns={columns}
					setColumns={setColumns}
					numberCells={numberCells}
				/>
			)}
		</div>
	);
};
