# Realty.AI Frontend

Frontend UI for real estate property management platform.

## Description

Realty.AI is an enterprise platform for commercial real estate developers and property managers. This repository contains the Frontend UI for the platform, built using React and Material-UI.

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

- ReactJS
- Material-UI (MUI)
- Oauth2
- Axios
- Sonner
- Formik
- Yup
- Day.js
- More...

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

## Environment Variables (optional)
Create a `.env` file in the root directory:
```sh
REACT_APP_API_BASE_URL="http://localhost:8000/api/v1"  # Default API base URL
```

## Testing
```sh
npm test
```

## License

Private and Confidential. All rights reserved.
