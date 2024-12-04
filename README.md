# Realty.AI Frontend

Frontend UI for real estate property management platform.

## Description

Realty.AI is an enterprise platform for commercial real estate developers and property managers. This repository contains the React-based frontend UI implementation.

## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

## Development

To start the development server:

```sh
npm start
```

The application will be available at `http://localhost:3000`.

## Building

To create a production build:
```sh
npm run build
```

## Technology Stack

- React 18.x
- Material-UI (MUI) 6.x
- React Router 6.x
- Formik + Yup
- Axios
- Day.js
- More...

## Project Structure
```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── config/         # Configuration files
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── theme/          # MUI theme customization
└── utils/          # Utility functions
```

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

## Environment Variables
Create a `.env` file in the root directory:
```sh
REACT_APP_API_URL=http://localhost:8000
```

## Testing
```sh
npm test
```

## License

Private and Confidential. All rights reserved.
