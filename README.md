# EthioHealthHub

A comprehensive healthcare platform connecting Ethiopian healthcare services, providers, and patients.

## Documentation

- [System Documentation (PDF)](documentation.pdf)

## Development Guide

### System Architecture

## Tech Stack

### Backend

- Django 4.x - Web framework
- Django REST Framework - API development
- Python 3.x - Programming language
- SQLite (Development) / PostgreSQL (Production)
- JWT Authentication
- Celery for async tasks
- Redis for caching

### Frontend

- React 18.x
- Redux for state management
- Axios for API requests
- Material-UI components
- React Router for navigation
- Jest for testing

## Getting Started

These instructions will help you set up EthioHealthHub on your local machine for development.

### Prerequisites

- Python 3.x
- Node.js (v14 or higher)
- npm/yarn
- Git
- PostgreSQL (optional for production)

### Backend Setup

1. Clone the repository

# add vertul environment

1 .python -m venv venv

# activate

source venv/scripts/activate may be different in your pc

## Features

- User Authentication and Authorization
- Healthcare Provider Directory
- Patient Management System
- Appointment Scheduling
- Medical Records Management
- Healthcare Service Listings
- Location-based Service Search

## API Documentation

- Detailed API documentation can be found in [API_Documentation.pdf](docs/API_Documentation.pdf)
- Interactive API endpoints available at `http://localhost:8000/api/docs/` when running the development server

## API Endpoints

### Authentication

- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/refresh/` - Refresh token

### Healthcare Providers

- `GET /api/providers/` - List providers
- `POST /api/providers/` - Register provider
- `GET /api/providers/{id}/` - Provider details

### Patients

- `GET /api/patients/` - List patients
- `POST /api/patients/` - Register patient
- `GET /api/patients/{id}/` - Patient details

### Appointments

- `GET /api/appointments/` - List appointments
- `POST /api/appointments/` - Create appointment
- `PUT /api/appointments/{id}/` - Update appointment

## Testing

### Backend Testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Django documentation
- React documentation
- Ethiopian Healthcare System Guidelines
- WHO Healthcare Standards
