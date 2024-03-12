Certainly! Here is the plain text for your README.md file:

```markdown
# <Diego_Allies_Assignment>

## Description

<Hico_Junior_Dev_Assessment>

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [SQL Files](#sql-files)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd <repository_directory>
```

2. Install dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root of the project:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_database_password>
DB_DATABASE=payroll_database
```

2. Modify the values according to your database configuration.

## Database Setup

1. Ensure MySQL is installed and running on your machine.

2. Run the following command to set up the database and tables:

```bash
npm run start
```

## Usage

Start the application:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

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