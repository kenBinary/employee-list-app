# Employee List Application

## Demo

https://github.com/user-attachments/assets/6c5c365e-18db-431f-936a-66e26dc7ec35

## Project Overview

Employee List Application that supports CRUD operations

## TLDR: Quick Start Script

Use the script `start-app.bat` to quickly run the app

```batch
@echo off
echo Starting Employee List Application...

echo Starting Backend API...
start cmd /k "cd API && dotnet run"

echo Waiting for backend to initialize...
timeout /t 10

echo Starting Frontend UI...
start cmd /k "cd UI && npm run dev"

echo Application starting! Check console windows for URLs.
```

## Tech Stack

### Frontend

- React (with TypeScript)
- Vite
- TailwindCSS with DaisyUI
- React Query for data fetching

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- Microsoft SQL Server database

### API Endpoints

The backend API exposes the following endpoints for employee management:

| Method | Endpoint             | Description        | Request Body        | Response                  |
| ------ | -------------------- | ------------------ | ------------------- | ------------------------- |
| GET    | `/api/Employee`      | Get all employees  | None                | Array of employee objects |
| GET    | `/api/Employee/{id}` | Get employee by ID | None                | Single employee object    |
| POST   | `/api/Employee`      | Add new employee   | `CreateEmployeeDto` | Created employee          |
| PUT    | `/api/Employee/{id}` | Update employee    | `UpdateEmployeeDto` | Updated employee          |
| DELETE | `/api/Employee/{id}` | Delete employee    | None                | ID of deleted employee    |

### Request/Response Models

```json
// CreateEmployeeDto & UpdateEmployeeDto
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "position": "string"
}

// EmployeeDto (Response)
{
  "id": 0,
  "fullName": "string",
  "email": "string",
  "position": "string"
}
```

The API runs at `http://localhost:5068` by default when started with `dotnet run`.

## Prerequisites

ensure the following are installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [.NET SDK](https://dotnet.microsoft.com/download) (version 8.0 or later)
- [SQL Server](https://www.microsoft.com/sql-server/) (or SQL Server Express)
- [Visual Studio](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/) (optional)

## Installation and Setup

### Backend Setup (ASP.NET Core API)

1. Navigate to the API directory:

   ```
   cd employee-list-app\API
   ```

2. Restore the .NET packages:

   ```
   dotnet restore
   ```

3. Update the database connection string in appsettings.json if necessary:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=Employees;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True;"
   }
   ```

4. Apply database migrations to create the database schema:

   ```
   dotnet ef database update
   ```

5. Start the backend server:
   ```
   dotnet run
   ```
   The API will run at http://localhost:5068

### Frontend Setup (React UI)

1. Navigate to the UI directory:

   ```
   cd employee-list-app\UI
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The UI will typically run at http://localhost:5173 (check console output for exact URL)

## Running the Full Stack Application

1. Start the backend first, ensuring it's running on http://localhost:5068
2. Start the frontend and access it through your browser
3. The frontend is already configured to connect to the backend at http://localhost:5068

## Features

- View list of employees with pagination
- Search employees by ID
- Add new employees
- Edit existing employee information
- Delete employees
- Responsive design with DaisyUI components

## Troubleshooting

### Common Issues

#### Database Connection Issues

- Ensure SQL Server is running
- Verify the connection string in appsettings.json
- Check that the database has been created using Entity Framework migrations

#### API Connection Issues

- Verify the API is running at http://localhost:5068
- Check browser console for CORS errors
- The backend has CORS configured to accept requests from any origin

#### UI Not Displaying Data

- Ensure the backend API is running
- Check browser developer tools for network errors
- Verify the API endpoints are accessible (e.g., http://localhost:5068/api/Employee)

## Additional Information

- The backend includes sample data that is seeded during database creation
- The application uses React Query for efficient data fetching and cache management
- The UI is styled using TailwindCSS with DaisyUI components for a modern look
