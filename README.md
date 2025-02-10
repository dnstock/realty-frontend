# Realty Frontend

## Description

Frontend User Interface for the real estate management system. This application is part of the Realty platform. It works in conjunction with the [Backend API Service](https://github.com/dnstock/realty-backend) to provide a complete solution for managing commercial real estate properties.

## Features
- User authentication
- Dashboard view
- Property management
- Unit tracking
- Tenant management
- Lease administration
- Insurance tracking
- Reporting and analytics
- More...

## Tech Stack

- ReactJS
- Material-UI (MUI)
- Oauth2
- Axios
- Sonner
- Formik
- Yup
- Day.js
- More...

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Docker (optional)

### Backend API Service

This app requires the [Backend API Service](https://github.com/dnstock/realty-backend) to be running. Follow the instructions in the [Backend README](https://github.com/dnstock/realty-backend/blob/main/README.md) to get the API service up and running.

It uses the `REACT_APP_API_BASE_URL` environment variable to specify the API base URL. If not provided, it defaults to `http://localhost:8000/api/v1`.

### Installation

This application can be run locally or in a Docker container. Follow the instructions below to get started.

Clone the repository:

```sh
git clone git@github.com:dnstock/realty-frontend.git
cd realty-frontend
```

Install dependencies:
```sh
npm install
# or
yarn install
```

## Development

### Development Server

To start the development server:
```sh
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Docker Container

To run the application in a Docker container:
```sh
docker-compose -f docker-compose.dev.yml up
# or
npm docker:dev
```

## Build & Deployment

To create a production build:
```sh
npm run build
```

The build artifacts will be available in the `build` directory.

To serve the production build:
```sh
npm run serve
```

The application will be available at [http://localhost:8080](http://localhost:8080).

### Docker Container

To run the application in a Docker container:
```sh
docker-compose -f docker-compose.prod.yml up
# or
npm docker:prod
```

## Linting

To lint the code:
```sh
npm run lint
```

To fix linting issues:
```sh
npm run lint:fix
```

## Formatting

To format the code:
```sh
npm run format
```

To check for formatting issues:
```sh
npm run format:check
```

## Project Structure
```
.
├── src/
│   ├── index.js                # Application entry point
│   ├── App.js                  # Root application component
│   ├── assets/                 # Static assets
│   ├── components/             # Reusable UI components
│   │   ├── dialogs/            # Dialog components
│   │   ├── forms/              # Form components
│   │   ├── layouts/            # Layout components
│   │   │   ├── content/        # Content layout components
│   │   │   ├── page/           # Page layout components
│   │   ├── routing/            # Routing components
│   │   └── tables/             # Table components
│   ├── config/                 # Configuration files
│   │   ├── resources/          # Resource data models
│   │   └── routes/             # Routing handlers
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   ├── theme/                  # MUI theme customization
│   └── utils/                  # Utility functions
└── public/
    └── index.html              # HTML entry point
```

## Docker Support

Development and production Docker configurations are available:

```sh
# Development
docker-compose -f docker-compose.dev.yml up
# or
npm docker:dev

# Production
docker-compose -f docker-compose.prod.yml up
# or
npm docker:prod
```

## Environment Variables (optional)
Create a `.env` file in the root directory:
```sh
REACT_APP_API_BASE_URL="http://localhost:8000/api/v1"  # Default API base URL
```

## Testing

This application uses Jest and React Testing Library for testing. To run the tests:
```sh
npm test
```

To run the tests with coverage:
```sh
npm test:coverage
```
## License

Private and Confidential. All rights reserved.
