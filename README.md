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

**CREATE IGNITE** is a next-generation CLI tool that scaffolds modern web projects in seconds. Whether you're building a React SPA, Vue application, Next.js site, or Express API, `create-ignite` handles everything from initial setup to framework configuration.

### Why CREATE IGNITE?

- **Universal** - Support for React, Vue, Next.js, Nuxt, Express, Fastify  
- **Smart** - Remembers your preferences for faster subsequent setups  
- **Flexible** - Choose your CSS framework, state management, and tools  
- **Modern** - Always uses latest stable versions  
- **Reliable** - Built-in retry logic and comprehensive error handling  
- **Beautiful** - Gorgeous terminal UI with gradients and spinners  

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
- **React** (Vite) - Fast, modern React development
- **Vue 3** (Vite) - Progressive JavaScript framework  
- **Next.js** - React framework for production
- **Nuxt 3** - Intuitive Vue framework

#### Backend
- **Express** - Fast, unopinionated web framework
- **Fastify** - Fast and low overhead web framework

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

### Smart Features

- **Config Persistence** - Remembers your preferences
- **Retry Logic** - Auto-retry failed installations
- **Validation** - Validates project names and configurations
- **Auto-Cleanup** - Removes boilerplate files
- **Progress Indicators** - Beautiful loading spinners
- **Gradient UI** - Eye-catching terminal interface
- **Error Recovery** - Helpful error messages and tips

---

## Documentation

For full documentation, examples, architecture details, and more, visit the [GitHub repository](https://github.com/kasimkazmi/create-ignite).

---

## Examples

### Example 1: React SPA with Full Stack

```bash
$ npx create-ignite

? Project name: my-react-app
? Project type: Frontend (SPA/SSR)
? Framework: React (Vite)
? Language: TypeScript
? CSS framework: Tailwind CSS v4
? State management: Redux Toolkit

Result: React + TypeScript + Tailwind + Redux + Router + Icons + Axios
```

### Example 2: Express API Server

```bash
$ npx create-ignite

? Project name: api-server
? Project type: Backend API
? Framework: Express
? Language: TypeScript
? Install CORS? Yes
? Install dotenv? Yes

Result: Express + TypeScript + CORS + dotenv + ESLint
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
