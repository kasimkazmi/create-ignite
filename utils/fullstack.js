/**
 * Full-stack scaffolding functions
 */

import { execa } from "execa";
import path from "path";
import chalk from "chalk";
import fs from "fs/promises";

const CURRENT_DIR = process.cwd();

/**
 * Scaffold full-stack application
 */
export async function scaffoldFullStack(projectName, language, spinner, config) {
	const { cssFramework, stateManagement, packageManager } = config;
	const projectPath = path.resolve(CURRENT_DIR, projectName);
	const ext = language === "ts" ? "ts" : "js";

	spinner.text = chalk.cyan("Creating full-stack project structure...");

	// Create root directory
	await fs.mkdir(projectPath, { recursive: true });

	// Create monorepo structure
	await fs.mkdir(path.join(projectPath, "apps"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "frontend"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "frontend", "src"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "frontend", "public"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "backend"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "backend", "src"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "backend", "src", "routes"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "apps", "backend", "src", "controllers"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "packages"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "packages", "shared"), { recursive: true });
	await fs.mkdir(path.join(projectPath, "docs"), { recursive: true });
	
	// Create root package.json
	const rootPackageJson = {
		name: projectName,
		version: "1.0.0",
		description: `A modern full-stack React/Express application`,
		private: true,
		workspaces: ["apps/*", "packages/*"],
		scripts: {
			dev: 'concurrently "npm run dev:frontend" "npm run dev:backend"',
			"dev:frontend": "cd apps/frontend && npm run dev",
			"dev:backend": "cd apps/backend && npm run dev",
			build: "npm run build:frontend && npm run build:backend",
			"build:frontend": "cd apps/frontend && npm run build",
			"build:backend": "cd apps/backend && npm run build"
		},
		devDependencies: {
			concurrently: "^8.2.2"
		}
	};

	await fs.writeFile(
		path.join(projectPath, "package.json"),
		JSON.stringify(rootPackageJson, null, 2)
	);

	// Create README
	const readme = `# ${projectName}

A modern full-stack application built with CREATE IGNITE.

## Structure

\`\`\`
${projectName}/
├── apps/
│   ├── frontend/   # React frontend
│   └── backend/    # Express backend
├── packages/
│   └── shared/     # Shared types and utilities
└── docs/           # Documentation
\`\`\`

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build for production
npm run build
\`\`\`

## Documentation

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Created with [CREATE IGNITE](https://github.com/kasimkazmi/create-ignite)
`;

	await fs.writeFile(path.join(projectPath, "README.md"), readme);

	// Create frontend package.json
	const frontendPackageJson = {
		name: `@${projectName}/frontend`,
		version: "1.0.0",
		type: "module",
		scripts: {
			dev: "vite",
			build: "vite build",
			preview: "vite preview",
			lint: "eslint . --ext js,jsx,ts,tsx"
		},
		dependencies: {
			react: "^18.3.1",
			"react-dom": "^18.3.1",
			axios: "^1.7.9"
		},
		devDependencies: {
			"@vitejs/plugin-react": "^4.3.4",
			vite: "^6.0.3",
			...(language === "ts" ? {
				typescript: "^5.7.2",
				"@types/react": "^18.3.18",
				"@types/react-dom": "^18.3.5"
			} : {})
		}
	};

	await fs.writeFile(
		path.join(projectPath, "apps", "frontend", "package.json"),
		JSON.stringify(frontendPackageJson, null, 2)
	);

	// Create backend package.json
	const backendPackageJson = {
		name: `@${projectName}/backend`,
		version: "1.0.0",
		type: "module",
		scripts: {
			dev: language === "ts" ? "tsx watch src/server.ts" : "nodemon",
			start: language === "ts" ? "node --loader tsx src/server.ts" : `node src/server.${ext}`,
			build: language === "ts" ? "tsc" : "echo 'No build needed for JavaScript'"
		},
		dependencies: {
			express: "^4.21.2",
			cors: "^2.8.5",
			dotenv: "^16.4.7"
		},
		devDependencies: {
			nodemon: "^3.1.9",
			...(language === "ts" ? {
				typescript: "^5.7.2",
				tsx: "^4.7.0",
				"@types/node": "^22.10.2",
				"@types/express": "^5.0.0",
				"@types/cors": "^2.8.17"
			} : {})
		}
	};

	await fs.writeFile(
		path.join(projectPath, "apps", "backend", "package.json"),
		JSON.stringify(backendPackageJson, null, 2)
	);

	// Create frontend vite.config
	const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})`;

	await fs.writeFile(
		path.join(projectPath, "apps", "frontend", `vite.config.${ext}`),
		viteConfig
	);

	// Create frontend index.html
	const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.${ext === "ts" ? "tsx" : "jsx"}"></script>
</body>
</html>`;

	await fs.writeFile(
		path.join(projectPath, "apps", "frontend", "index.html"),
		indexHtml
	);

	// Create frontend main file
	const mainFile = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')${language === "ts" ? "!" : ""}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

	await fs.writeFile(
		path.join(projectPath, "apps", "frontend", "src", `main.${ext === "ts" ? "tsx" : "jsx"}`),
		mainFile
	);

	// Create frontend App component
	const appComponent = `${language === "ts" ? "import React from 'react'\n" : "import React from 'react'\n"}
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-gray-900 font-semibold text-lg">${projectName}</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#api" className="text-gray-700 hover:text-blue-600 transition-colors">API</a>
              <a href="#docs" className="text-gray-700 hover:text-blue-600 transition-colors">Docs</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Your
            <span className="block text-blue-600">Full-Stack App</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern full-stack application with React frontend and Express backend.
            Ready to help you build scalable web applications with real-time features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              View API
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">R</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Frontend (React)</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Modern React application with Vite, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Running on http://localhost:3000</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">E</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Backend (Express)</h3>
            </div>
            <p className="text-gray-600 mb-4">
              RESTful API server with Express, CORS, and environment configuration.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">API running on http://localhost:5000</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Built with Modern Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">F</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Development</h3>
              <p className="text-gray-600">Hot reload and instant feedback for rapid development</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl font-bold">T</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Type Safety</h3>
              <p className="text-gray-600">Full TypeScript support for better code quality</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl font-bold">P</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Production Ready</h3>
              <p className="text-gray-600">Optimized for deployment with Docker support</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2024 ${projectName}. Built with CREATE IGNITE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App`;

	await fs.writeFile(
		path.join(projectPath, "apps", "frontend", "src", `App.${ext === "ts" ? "tsx" : "jsx"}`),
		appComponent
	);

	// Create frontend App.css
	const appCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`;

	await fs.writeFile(
		path.join(projectPath, "apps", "frontend", "src", "App.css"),
		appCss
	);

	// Create backend server file
	const serverFile = `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to ${projectName} API',
    endpoints: {
      health: '/api/health',
      version: '/api/version'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
  console.log(\`API: http://localhost:\${PORT}/api\`);
});`;

	await fs.writeFile(
		path.join(projectPath, "apps", "backend", "src", `server.${ext}`),
		serverFile
	);

	// Create backend .env file
	const envFile = `PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000`;

	await fs.writeFile(
		path.join(projectPath, "apps", "backend", ".env"),
		envFile
	);

	// Create nodemon.json for backend
	const nodemonConfig = {
		watch: ["src"],
		ext: ext === "ts" ? "ts" : "js",
		ignore: ["src/**/*.spec.js", "src/**/*.test.js"],
		exec: `node src/server.${ext}`
	};

	await fs.writeFile(
		path.join(projectPath, "apps", "backend", "nodemon.json"),
		JSON.stringify(nodemonConfig, null, 2)
	);

	// Create .gitignore for root
	const gitignore = `node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
.vscode/
.idea/`;

	await fs.writeFile(
		path.join(projectPath, ".gitignore"),
		gitignore
	);

	// Create TypeScript config files (if TypeScript)
	if (language === "ts") {
		// Backend tsconfig.json
		const backendTsConfig = {
			compilerOptions: {
				target: "ES2022",
				module: "ESNext",
				moduleResolution: "bundler",
				outDir: "./dist",
				rootDir: "./src",
				strict: true,
				esModuleInterop: true,
				skipLibCheck: true,
				forceConsistentCasingInFileNames: true,
				resolveJsonModule: true,
				allowSyntheticDefaultImports: true
			},
			include: ["src/**/*"],
			exclude: ["node_modules", "dist"]
		};

		await fs.writeFile(
			path.join(projectPath, "apps", "backend", "tsconfig.json"),
			JSON.stringify(backendTsConfig, null, 2)
		);

		// Frontend tsconfig.json
		const frontendTsConfig = {
			compilerOptions: {
				target: "ES2020",
				useDefineForClassFields: true,
				lib: ["ES2020", "DOM", "DOM.Iterable"],
				module: "ESNext",
				skipLibCheck: true,
				moduleResolution: "bundler",
				allowImportingTsExtensions: true,
				resolveJsonModule: true,
				isolatedModules: true,
				noEmit: true,
				jsx: "react-jsx",
				strict: true,
				noUnusedLocals: true,
				noUnusedParameters: true,
				noFallthroughCasesInSwitch: true
			},
			include: ["src"],
			references: [{ path: "./tsconfig.node.json" }]
		};

		await fs.writeFile(
			path.join(projectPath, "apps", "frontend", "tsconfig.json"),
			JSON.stringify(frontendTsConfig, null, 2)
		);

		// Frontend tsconfig.node.json (for vite config)
		const frontendTsConfigNode = {
			compilerOptions: {
				composite: true,
				skipLibCheck: true,
				module: "ESNext",
				moduleResolution: "bundler",
				allowSyntheticDefaultImports: true
			},
			include: ["vite.config.ts"]
		};

		await fs.writeFile(
			path.join(projectPath, "apps", "frontend", "tsconfig.node.json"),
			JSON.stringify(frontendTsConfigNode, null, 2)
		);

		// Shared types
		const sharedTypes = `export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}`;

		await fs.writeFile(
			path.join(projectPath, "packages", "shared", "types.ts"),
			sharedTypes
		);
	}

	// Install dependencies
	spinner.text = chalk.cyan("Installing dependencies...");
	try {
		// Install root dependencies
		await execa(packageManager, ["install"], { cwd: projectPath });
		
		// Install frontend dependencies
		spinner.text = chalk.cyan("Installing frontend dependencies...");
		await execa(packageManager, ["install"], { cwd: path.join(projectPath, "apps", "frontend") });
		
		// Install backend dependencies
		spinner.text = chalk.cyan("Installing backend dependencies...");
		await execa(packageManager, ["install"], { cwd: path.join(projectPath, "apps", "backend") });
		
		spinner.succeed(chalk.green("All dependencies installed successfully!"));
	} catch (error) {
		spinner.warn(chalk.yellow("Could not install dependencies automatically"));
		console.log(chalk.cyan(`\nPlease run:\ncd ${projectName}\nnpm install\ncd apps/frontend && npm install\ncd ../backend && npm install\n`));
	}
}
