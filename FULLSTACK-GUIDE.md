# Full-Stack Template Guide

## Overview

The full-stack template creates a complete monorepo application with:
- **Frontend**: React + Vite
- **Backend**: Express API
- **Shared**: Common types and utilities

## Project Structure

```
my-fullstack-app/
├── apps/
│   ├── frontend/              # React frontend application
│   │   ├── src/
│   │   │   ├── App.jsx/tsx   # Main App component
│   │   │   └── main.jsx/tsx  # Entry point
│   │   ├── public/           # Static assets
│   │   ├── index.html        # HTML template
│   │   ├── vite.config.js    # Vite configuration
│   │   └── package.json      # Frontend dependencies
│   │
│   └── backend/              # Express backend API
│       ├── src/
│       │   ├── routes/       # API routes
│       │   ├── controllers/  # Request handlers
│       │   └── server.js     # Express server
│       ├── .env              # Environment variables
│       ├── nodemon.json      # Nodemon configuration
│       └── package.json      # Backend dependencies
│
├── packages/
│   └── shared/               # Shared code
│       └── types.ts          # TypeScript types (if using TS)
│
├── docs/                     # Documentation
├── .gitignore               # Git ignore rules
├── package.json             # Root package (workspaces)
└── README.md                # Project documentation
```

## Features

### Frontend (React + Vite)
- ⚡ Vite for lightning-fast development
- ⚛️ React 18.3 with modern features
- 🎨 Optional Tailwind CSS / Bootstrap
- 🔄 API proxy configured to backend
- 📦 TypeScript support (optional)
- 🚀 Hot Module Replacement (HMR)

### Backend (Express)
- 🚀 Express 4.21 server
- 🔒 CORS middleware configured
- 🌍 Environment variables with dotenv
- 📊 Health check endpoint
- 🔄 Nodemon for auto-reload
- 📝 TypeScript support (optional)

### Shared
- 📦 npm workspaces for monorepo management
- 🔗 Shared TypeScript types
- 📚 Centralized utilities
- 🎯 Consistent development experience

## Getting Started

### Installation

```bash
# Create a new full-stack project
npx create-ignite my-fullstack-app

# Select options:
# 1. Project type: Full-Stack Application
# 2. Language: TypeScript or JavaScript
# 3. CSS Framework: Tailwind, Bootstrap, or None
# 4. State Management: Redux, Zustand, or None
```

### Development

```bash
# Navigate to project
cd my-fullstack-app

# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Start only frontend (port 3000)
npm run dev:backend   # Start only backend (port 5000)
```

### Building for Production

```bash
# Build both applications
npm run build

# Build individually:
npm run build:frontend
npm run build:backend
```

## Available Scripts

### Root Scripts
- `npm run dev` - Start both frontend and backend concurrently
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build both applications
- `npm run build:frontend` - Build only frontend
- `npm run build:backend` - Build only backend

### Frontend Scripts (in apps/frontend/)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts (in apps/backend/)
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run start` - Start production server

## API Endpoints

### Backend (http://localhost:5000)

- `GET /api` - API information
- `GET /api/health` - Health check endpoint

Example response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Environment Variables

### Frontend (.env in apps/frontend/)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=My App
```

### Backend (.env in apps/backend/)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Making API Calls from Frontend

The frontend is configured with a Vite proxy, so you can make API calls easily:

```javascript
// Example: Fetch from backend API
import axios from 'axios';

// The /api prefix will be proxied to http://localhost:5000
const response = await axios.get('/api/health');
console.log(response.data);
```

## Adding New Features

### Adding a New API Endpoint

1. Create a route file in `apps/backend/src/routes/`:
```javascript
// apps/backend/src/routes/users.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

export default router;
```

2. Import and use in `server.js`:
```javascript
import userRoutes from './routes/users.js';
app.use('/api/users', userRoutes);
```

### Adding Shared Types (TypeScript)

In `packages/shared/types.ts`:
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}
```

Use in frontend:
```typescript
import { User } from '@my-fullstack-app/shared';
```

Use in backend:
```typescript
import { User } from '@my-fullstack-app/shared';
```

## Deployment

### Frontend Deployment

Deploy to Vercel, Netlify, or any static hosting:

```bash
cd apps/frontend
npm run build
# Upload 'dist' folder to your hosting service
```

### Backend Deployment

Deploy to Railway, Heroku, or any Node.js hosting:

```bash
cd apps/backend
npm run build # if using TypeScript
# Deploy with your hosting service
```

### Docker Deployment

Create `Dockerfile` for each app or use docker-compose for both.

## Troubleshooting

### Port Already in Use

If you see "EADDRINUSE" errors:

```bash
# Kill process on port 3000 (frontend)
npx kill-port 3000

# Kill process on port 5000 (backend)
npx kill-port 5000
```

### Module Not Found Errors

```bash
# Reinstall all dependencies
rm -rf node_modules apps/*/node_modules
npm install
cd apps/frontend && npm install
cd ../backend && npm install
```

### CORS Errors

Make sure the backend `.env` file has the correct `CORS_ORIGIN`:
```env
CORS_ORIGIN=http://localhost:3000
```

### Nodemon Not Reloading

Check `apps/backend/nodemon.json` configuration and ensure it's watching the correct files.

## Best Practices

1. **Shared Types**: Keep shared TypeScript types in `packages/shared/`
2. **Environment Variables**: Never commit `.env` files
3. **API Proxy**: Use Vite proxy for API calls in development
4. **Monorepo**: Use npm workspaces for dependency management
5. **Documentation**: Keep API documentation up to date

## Next Steps

- Add authentication (JWT, OAuth)
- Set up database (PostgreSQL, MongoDB)
- Add state management (Redux, Zustand)
- Implement testing (Vitest, Jest)
- Add CI/CD pipeline
- Configure Docker containers
- Set up logging and monitoring

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

## Support

For issues or questions:
- GitHub Issues: https://github.com/kasimkazmi/create-ignite/issues
- Documentation: https://github.com/kasimkazmi/create-ignite

---

Created with [CREATE IGNITE](https://github.com/kasimkazmi/create-ignite)
