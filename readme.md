```markdown
# <Diego_Allies_Assignment>

## Description

<Hico_Junior_Dev_Assessment>

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [SQL Files](#sql-files)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/diegoallies/Hico-Group-test
```

2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

## Configuration

```javascript
// payrollApi.jsx
const apiEndpoint = "http://localhost:3000/api"; 
```

2. Create a `.env` file in the root of the project:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_database_password>
DB_DATABASE=payroll_database
```

3. Modify the values according to your database configuration.

## Database Setup

1. Ensure MySQL is installed and running on your machine.

2. Run the following command to set up the database and tables:

```bash
npm run start
```

## Frontend Setup

### Prerequisites

- Node.js and npm installed on your machine. [Download Node.js](https://nodejs.org/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/diegoallies/Hico-Group-test
cd frontend
```

2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

4. Navigate to the frontend directory:

```bash
cd ..
cd backened
```

5. Install dependencies:

```bash
npm install
```

### Usage

Start the frontend application:

```bash
npm run start
```
Run on backened && frontend

The application will be available at [http://localhost:3000](http://localhost:3000).

## Frontend Structure

### Components

- **Header.tsx**: Displays the application header.
- **Button.tsx**: Reusable button component.
- **CheckboxInput.tsx**: Reusable checkbox input component.
- **NumberInput.tsx**: Reusable number input component.
- **CurrencyNumberInput.tsx**: Reusable currency number input component.
- **DropdownInput.tsx**: Reusable dropdown input component.
- **RadioInput.tsx**: Reusable radio input component.
- **EmployeeTable.tsx**: Reusable employee table component.
- **FormInput.tsx**: Reusable form input component.
- **Pagination.tsx**: Reusable pagination component.

### Configuration Data

- **config.ts**: Contains configuration data such as gender options, salutation options, and color options.

### App.jsx

The main application component. Manages the state, fetches data from the API, and renders the UI.

### Styling

- **App.css**: Contains styles for the application.

## API Endpoints

### Create Database

- **Endpoint:** `/api/user/create/database`
- **Method:** `GET`
- **Description:** Create the database.

### Create Table

- **Endpoint:** `/api/user/create/table`
- **Method:** `GET`
- **Description:** Create the required table.

### Create Payroll Entry

- **Endpoint:** `/api/user/create/list`
- **Method:** `POST`
- **Description:** Create a new payroll entry.

### Show Payrolls

- **Endpoint:** `/api/user/show/payrolls`
- **Method:** `GET`
- **Description:** Retrieve all payrolls.

### Show Single Payroll

- **Endpoint:** `/api/user/payroll/:id`
- **Method:** `GET`
- **Description:** Retrieve a single payroll entry.

### Update Payroll

- **Endpoint:** `/api/user/update/payroll/:id`
- **Method:** `PUT`
- **Description:** Update a payroll entry.

### Delete Payroll

- **Endpoint:** `/api/user/delete/payroll/:id`
- **Method:** `DELETE`
- **Description:** Delete a payroll entry.

## SQL Files

- `create_database.sql`: SQL script to create the database.
- `create_table.sql`: SQL script to create the required table.
- `insert_payroll.sql`: SQL script to insert a new payroll entry.
- `show_payrolls.sql`: SQL script to retrieve all payrolls.
- `update_payroll_sp.sql`: SQL script to create the stored procedure for updating payroll.
- `delete_payroll_sp.sql`: SQL script to create the stored procedure for deleting payroll.
- `show_single_payroll_sp.sql`: SQL script to create the stored procedure for retrieving a single payroll.

## License

This project is licensed under the [MIT License](LICENSE).
```
