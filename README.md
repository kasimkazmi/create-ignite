# CREATE IGNITE

<div align="center">

[![npm version](https://img.shields.io/npm/v/create-ignite.svg?style=flat-square)](https://www.npmjs.com/package/create-ignite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/create-ignite.svg?style=flat-square)](https://nodejs.org)
[![Downloads](https://img.shields.io/npm/dm/create-ignite.svg?style=flat-square)](https://www.npmjs.com/package/create-ignite)

**Universal project scaffolder for modern web development**

*One command to ignite any project type*

[Quick Start](#quick-start) • [Features](#features) • [Documentation](#documentation) • [Examples](#examples)

</div>

---

## What is CREATE IGNITE?

**CREATE IGNITE** is a next-generation CLI tool that scaffolds production-ready web projects in seconds. Whether you're building a React SPA, Vue application, Next.js site, Express API, or a complete full-stack application, `create-ignite` handles everything from initial setup to enterprise-grade configuration.

### Why CREATE IGNITE?

- **Universal** - Support for React, Vue, Next.js, Nuxt, Express, Fastify, and Full-Stack  
- **Production-Ready** - Enterprise-grade templates with best practices built-in  
- **Smart** - Remembers your preferences for faster subsequent setups  
- **Flexible** - Choose your CSS framework, state management, and tools  
- **Modern** - Always uses latest stable versions with optimized configurations  
- **Secure** - Built-in security middleware, authentication, and validation  
- **Docker Ready** - Complete Docker setup with multi-container orchestration  
- **Monorepo Support** - Full-stack projects with shared packages and types  
- **Reliable** - Built-in retry logic and comprehensive error handling  
- **Clean UI** - Professional, clean terminal interface without emojis or gradients  

---

## Quick Start

### Prerequisites

- **Node.js** 16.0.0 or higher
- **npm** 7.0.0 or higher (or yarn/pnpm)

### Create Your First Project

```bash
# Using npx (recommended - always latest version)
npx create-ignite

# Or install globally
npm install -g create-ignite
create-ignite

# Or use the short alias
ignite
```

### Interactive Setup

```bash
$ npx create-ignite

╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          CREATE IGNITE                                    ║
║                                                           ║
║     Universal Project Scaffolder                         ║
║     React • Vue • Next.js • Express & More               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

Let's create your project!

? Project name: my-awesome-app
? What type of project? Frontend (SPA/SSR)
? Which framework? React (Vite)
? Which language? TypeScript
? Which CSS framework? Tailwind CSS v4
? State management library? Redux Toolkit
? Install router? Yes
? Install icon library? Yes
? Install Axios? Yes
? Which package manager? npm
? Initialize git repository? Yes
? Install ESLint? Yes
? Install Prettier? Yes

Project created successfully!
```

---

## Features

### Multiple Frameworks

#### Frontend
- **React** (Vite) - Fast, modern React development with production-ready templates
- **Vue 3** (Vite) - Progressive JavaScript framework with modern composition API
- **Next.js** - React framework for production with App Router and RSC
- **Nuxt 3** - Intuitive Vue framework with auto-imports and server-side rendering

#### Backend
- **Express** - Fast, unopinionated web framework with security middleware
- **Fastify** - Fast and low overhead web framework with TypeScript support

#### Full-Stack
- **Monorepo** - Complete full-stack setup with frontend + backend + shared packages
- **Docker** - Multi-container setup with PostgreSQL, Redis, and Nginx
- **Authentication** - JWT-based auth system with bcrypt password hashing
- **API Layer** - Structured API with controllers, middleware, and routes
- **Shared Types** - TypeScript types shared between frontend and backend

### CSS Frameworks

- **Tailwind CSS v4** - Utility-first CSS with new Vite plugin
- **Bootstrap 5** - Popular CSS framework
- **Material-UI (MUI)** - React component library
- **Chakra UI** - Modular component library
- **None** - Vanilla CSS

### State Management

#### React/Next.js
- Redux Toolkit
- Zustand
- MobX

#### Vue/Nuxt
- Pinia (recommended)
- Vuex

### Optional Features

- **Router** - React Router or Vue Router
- **Icons** - react-icons library
- **HTTP Client** - Axios
- **Linting** - ESLint with framework-specific plugins
- **Formatting** - Prettier
- **TypeScript** - Full TypeScript support
- **Git** - Automatic repository initialization

### Production-Ready Features

- **Professional Structure** - Complete folder structure with components, pages, utils, and tests
- **Security Built-In** - Helmet, CORS, rate limiting, and JWT authentication
- **Documentation** - Auto-generated README, API docs, and getting started guides
- **Testing Setup** - Unit and integration test configurations ready to use
- **Logging & Monitoring** - Winston logger with file rotation and error tracking
- **Environment Config** - Multiple environment support (dev, staging, production)
- **Code Quality** - ESLint, Prettier, and TypeScript strict mode configured
- **Build Optimization** - Code splitting, tree shaking, and minification
- **Docker Support** - Dockerfile and docker-compose for easy deployment
- **Dependency Management** - Optimized package.json with latest versions

### Smart Features

- **Config Persistence** - Remembers your preferences
- **Retry Logic** - Auto-retry failed installations
- **Validation** - Validates project names and configurations
- **Auto-Cleanup** - Removes boilerplate files
- **Progress Indicators** - Beautiful loading spinners
- **Clean UI** - Professional, clean terminal interface without emojis or gradients
- **Error Recovery** - Helpful error messages and tips
- **Health Checks** - Built-in health check endpoints for monitoring

### Template Features

- **Professional Design** - Clean, modern templates that look like actual framework sample pages
- **Consistent Styling** - Unified color scheme across all framework templates
- **Framework-Specific Colors** - Blue for React/Next.js, Green for Vue, maintaining brand identity
- **Responsive Layout** - Mobile-first design that works on all screen sizes
- **Component Structure** - Proper separation of Header, Hero, Features, and Footer components

---

## Documentation

For full documentation, examples, architecture details, and more, visit the [GitHub repository](https://github.com/kasimkazmi/create-ignite).

---

## Examples

### Example 1: Full-Stack Application

```bash
$ npx create-ignite

? Project name: my-fullstack-app
? Project type: Full-Stack
? Framework: Full-Stack (React + Express)
? Language: TypeScript
? CSS framework: Tailwind CSS v4
? State management: Redux Toolkit

Result: Complete monorepo with:
- Frontend (React + TypeScript + Tailwind)
- Backend (Express + JWT Auth + PostgreSQL)
- Shared packages (types, utilities)
- Docker setup (PostgreSQL, Redis, Nginx)
- API service layer with authentication
- Production-ready configuration
```

### Example 2: React SPA with Modern Features

```bash
$ npx create-ignite

? Project name: my-react-app
? Project type: Frontend (SPA/SSR)
? Framework: React (Vite)
? Language: TypeScript
? CSS framework: Tailwind CSS v4
? State management: Redux Toolkit

Result: Production-ready React app with:
- Clean, professional UI without gradients or emojis
- Components: Header, Hero, Footer, Features
- Global styles with Tailwind utilities
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls
- ESLint + Prettier configured
- Testing setup with Vitest
```

### Example 3: Express API Server

```bash
$ npx create-ignite

? Project name: api-server
? Project type: Backend API
? Framework: Express
? Language: TypeScript
? Install CORS? Yes
? Install dotenv? Yes

Result: Enterprise-grade Express API with:
- Controllers, middleware, routes structure
- JWT authentication system
- Security middleware (Helmet, CORS, Rate Limiting)
- Winston logger with file rotation
- Error handling and validation
- Health check endpoints
- TypeScript strict mode
- Testing setup with Jest
```

### Example 4: Next.js App with TypeScript

```bash
$ npx create-ignite

? Project name: my-nextjs-app
? Project type: Frontend (SPA/SSR)
? Framework: Next.js
? Language: TypeScript
? CSS framework: Tailwind CSS v4

Result: Next.js 15 app with:
- Clean, professional UI without gradients or emojis
- App Router with React Server Components
- TypeScript with strict mode
- Tailwind CSS v4 with Vite plugin
- SEO optimization with metadata API
- Components: Header, Hero, Features, Footer
- Performance optimized
- Production-ready configuration
```

---

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](https://github.com/kasimkazmi/create-ignite/blob/master/CONTRIBUTING.md) before submitting a Pull Request.

---

## License

MIT License - Copyright (c) 2025 Kasim Kazmi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Author

**Kasim Kazmi**

- GitHub: [@kasimkazmi](https://github.com/kasimkazmi)
- Repository: [create-ignite](https://github.com/kasimkazmi/create-ignite)

---

<div align="center">

**Ignite Your Next Project**

Made with passion by Kasim Kazmi

[Get Started](#quick-start) • [GitHub](https://github.com/kasimkazmi/create-ignite) • [Issues](https://github.com/kasimkazmi/create-ignite/issues)

</div>
