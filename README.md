# React Table Management Project

This project is a React application designed to manage a dynamic table with customizable columns and cells. It allows users to create, edit, and delete columns, populate cells with different data types, and validate mandatory cell entries.



# Features

* Dynamic Column Creation: Users can add new columns to the table, specifying the column name, type (e.g., text, number, email, select, checkbox), and whether cells in the column are mandatory.
* Cell Population: Depending on the column type, cells can be populated with various data types, including selectable options for "select" type columns.
* Validation: Mandatory columns enforce cell completion, highlighting empty cells for users to fill.
* Storage: Application state, including columns, cell data, and user configurations, is persisted using localStorage.



# Components

1. "App"
* Responsibilities:
    * Manages overall application state, including columns, modal visibility, and error tracking.
    * Renders the main layout with a header, dynamic columns, and modal for column creation.
    * Provides functions to add and delete rows.

2. "Header"
* Responsibilities:
	* Displays the application header with a logo and buttons for adding new columns and sending the table.
	* Manages modal visibility to create new columns.

3. "Modal"
* Responsibilities:
	* Renders a modal window for creating new columns.
	* Manages form inputs for column name, type, and mandatory settings.
	* Supports the addition of selectable options for "select" type columns.

4. "Column"
* Responsibilities:
	* Represents a single column within the table.
	* Handles column title editing and cell data manipulation.
	* Provides functionality to delete the entire column.

5. "Cell"
* Responsibilities:
	* Represents a single cell within a column, displaying based on its type (text, number, email, checkbox, select).
	* Handles user input for cell values and checkbox toggles.
	* Supports error highlighting for mandatory cells.

6. "Empty"
* Responsibilities:
	* Renders a message when the table is empty, prompting users to add rows and input data.



# Usage

1. Adding Columns:
	* Click "New columns" in the header to open the modal.
	* Enter the column name, select the type, and set mandatory cell requirements.
	* Optionally, provide selectable options for "select" type columns.

2. Managing Cells:
	* Populate cells with appropriate data based on the column type.
	* Mandatory columns will highlight empty cells for completion.

3. Deleting Columns:
	* Click "Delete Column" within a column to remove it from the table.

4. Sending Table:
	* Click "Send table" in the header to validate and send the completed table.



# Technologies Used

* React: Frontend library for building dynamic user interfaces.
* localStorage: Browser storage for persisting application state.
* HTML/CSS: Structure and styling of components.



# Getting Started
To run the project locally:

1. Clone the repository.
2. Install dependencies using npm install.
3. Start the development server with npm start.
4. Open the application in your browser at http://localhost:3000.

# Future Enhancements

* Drag-and-Drop: Implement drag-and-drop functionality to reorder columns.
* Sorting and Filtering: Add sorting and filtering options for column data.
* User Authentication: Integrate user authentication to save personalized tables.

# Contributors
Creciun Dorin