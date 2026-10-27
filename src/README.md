# Agriculture Management System

A React-based Agriculture Management System developed using React, Redux Toolkit, Bootstrap and localStorage.

## Features

### Authentication
- Admin and Manager login
- Protected routes
- Persistent session
- Role-based access

### Dashboard
- Lahore live weather
- Temperature
- Humidity
- Wind
- Rain
- 5-day forecast
- Automatic weather refresh
- Crop health distribution
- Upcoming harvests
- Farm task summary
- Inventory alerts
- Revenue and expense overview

### Crop Management
- Add crop
- Edit crop
- Delete crop
- Search crops
- Health filter
- Health score
- Planting date
- Harvest/cutting date

### Harvest & Orders
- Create orders
- Edit orders
- Delete orders
- Buyer selection
- Quantity management
- Order status
- Stock validation

### Buyers
- Add buyer
- Edit buyer
- Delete buyer
- CNIC validation
- CNIC auto-formatting
- Duplicate CNIC prevention
- JPG/PNG image validation
- Maximum image size 1 MB
- Image preview
- localStorage persistence

### Farm Tasks
- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks
- Due dates
- Priority
- Status
- Search
- Filters
- Overdue task detection

### Expenses
- Add expenses
- Edit expenses
- Delete expenses
- Expense categories
- Crop-based expenses
- Monthly totals
- Profit/Loss calculation

### Inventory
- Add inventory items
- Edit inventory
- Delete inventory
- Stock quantity
- Minimum stock level
- Supplier
- Low-stock alerts
- Stock usage tracking

### Reports
- Crop performance
- Sales and orders
- Expenses
- Inventory summary
- Profit/Loss
- Monthly filtering
- CSV export
- Print report
- Activity log

## Technologies

- React
- Redux Toolkit
- React Redux
- React Router
- Bootstrap
- Bootstrap Icons
- Recharts
- Open-Meteo API
- JavaScript
- localStorage

## Redux Architecture

The application uses Redux Toolkit for global state management.

State includes:

- crops
- orders
- buyers
- weather
- tasks
- expenses
- inventory
- auth
- alerts
- activity
- ui

## Persistence

Application data is automatically stored in localStorage.

Storage keys:

- agri_crops
- agri_orders
- agri_buyers
- agri_tasks
- agri_expenses
- agri_inventory
- agri_activity
- agri_session

## Demo Credentials

### Admin

Email:
admin@agri.com

Password:
admin123

### Manager

Email:
manager@agri.com

Password:
manager123

## Installation

Clone the repository and install dependencies:

```bash
npm install