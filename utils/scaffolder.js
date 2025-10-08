/**
 * Project scaffolding logic
 */

import { execa } from "execa";
import path from "path";
import chalk from "chalk";
import { FRAMEWORKS } from "./constants.js";
import { ErrorHandler } from "./errorHandler.js";

const CURRENT_DIR = process.cwd();

/**
 * Scaffold project based on framework
 * @param {Object} config - Project configuration
 * @param {Object} spinner - Ora spinner instance
 */
export async function scaffoldProject(config, spinner) {
	const { projectName, framework, language } = config;
	const projectPath = path.resolve(CURRENT_DIR, projectName);

	try {
		spinner.text = chalk.cyan(`Creating ${framework} project...`);

		switch (framework) {
			case FRAMEWORKS.REACT:
				await scaffoldReact(projectName, language, spinner);
				break;

			case FRAMEWORKS.VUE:
				await scaffoldVue(projectName, language, spinner);
				break;

			case FRAMEWORKS.NEXTJS:
				await scaffoldNextJS(projectName, language, spinner);
				break;

			case FRAMEWORKS.NUXT:
				await scaffoldNuxt(projectName, language, spinner);
				break;

			case FRAMEWORKS.EXPRESS:
				await scaffoldExpress(projectName, language, spinner);
				break;

			case FRAMEWORKS.FASTIFY:
				await scaffoldFastify(projectName, language, spinner);
				break;

			default:
				throw new Error(`Unsupported framework: ${framework}`);
		}

		// Change to project directory
		process.chdir(projectPath);

		spinner.text = chalk.cyan("Project scaffolded successfully");
		return projectPath;

	} catch (error) {
		throw ErrorHandler.createError(
			`Failed to scaffold ${framework} project: ${error.message}`,
			"SCAFFOLD_FAILED"
		);
	}
}

/**
 * Scaffold React project with Vite
 */
async function scaffoldReact(projectName, language, spinner) {
	const template = language === "ts" ? "react-ts" : "react";
	
	await execa(
		"npm",
		["create", "vite@latest", projectName, "--", "--template", template],
		{ stdio: ["pipe", "pipe", "inherit"] }
	);
}

/**
 * Scaffold Vue project with Vite
 */
async function scaffoldVue(projectName, language, spinner) {
	const template = language === "ts" ? "vue-ts" : "vue";
	
	await execa(
		"npm",
		["create", "vite@latest", projectName, "--", "--template", template],
		{ stdio: ["pipe", "pipe", "inherit"] }
	);
}

/**
 * Scaffold Next.js project
 */
async function scaffoldNextJS(projectName, language, spinner) {
	const args = [
		"create",
		"next-app@latest",
		projectName,
		"--no-install",
	];

	if (language === "ts") {
		args.push("--typescript");
	} else {
		args.push("--js");
	}

	// Add common Next.js flags
	args.push("--eslint", "--app", "--src-dir", "--import-alias", "@/*");

	try {
		await execa("npx", args, { 
			stdio: ["pipe", "pipe", "inherit"],
			cwd: CURRENT_DIR // Ensure we're in the correct directory
		});
	} catch (error) {
		// If create-next-app fails, try alternative approach
		spinner.text = chalk.yellow("Falling back to manual Next.js setup...");
		
		const projectPath = path.resolve(CURRENT_DIR, projectName);
		await createNextJSManually(projectName, language, projectPath);
	}
}

/**
 * Manual Next.js project creation as fallback
 */
async function createNextJSManually(projectName, language, projectPath) {
	const { mkdir, writeFile } = await import("fs/promises");

	// Create directory structure
	await mkdir(projectPath, { recursive: true });
	await mkdir(path.join(projectPath, "src"), { recursive: true });
	await mkdir(path.join(projectPath, "src", "app"), { recursive: true });
	await mkdir(path.join(projectPath, "public"), { recursive: true });

	// Create package.json
	const packageJson = {
		name: projectName,
		version: "0.1.0",
		description: "Next.js project created with create-ignite",
		private: true,
		scripts: {
			dev: "next dev",
			build: "next build",
			start: "next start",
			lint: "next lint"
		},
		dependencies: {
			next: "^15.0.0",
			react: "^18.0.0",
			"react-dom": "^18.0.0"
		},
		devDependencies: {
			eslint: "^8.0.0",
			"eslint-config-next": "^15.0.0"
		}
	};

	if (language === "ts") {
		packageJson.devDependencies.typescript = "^5.0.0";
		packageJson.devDependencies["@types/node"] = "^20.0.0";
		packageJson.devDependencies["@types/react"] = "^18.0.0";
		packageJson.devDependencies["@types/react-dom"] = "^18.0.0";
	}

	await writeFile(
		path.join(projectPath, "package.json"),
		JSON.stringify(packageJson, null, 2)
	);

	// Create Next.js config
	const nextConfig = {
		experimental: {
			appDir: true
		}
	};

	await writeFile(
		path.join(projectPath, "next.config.js"),
		`/** @type {import('next').NextConfig} */
const nextConfig = ${JSON.stringify(nextConfig, null, 2)}

module.exports = nextConfig`
	);

	// Create page component
	const ext = language === "ts" ? "tsx" : "jsx";
	const pageContent = language === "ts" 
		? `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.${ext}</code>
        </p>
      </div>
    </main>
  );
}`
		: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.${ext}</code>
        </p>
      </div>
    </main>
  );
}`;

	await writeFile(
		path.join(projectPath, "src", "app", `page.${ext}`),
		pageContent
	);

	// Create layout
	const layoutContent = language === "ts"
		? `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${projectName}',
  description: 'Generated by create-ignite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}`
		: `import './globals.css'

export const metadata = {
  title: '${projectName}',
  description: 'Generated by create-ignite',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}`;

	await writeFile(
		path.join(projectPath, "src", "app", "layout.tsx"),
		layoutContent
	);

	// Create globals.css
	const globalsCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`;

	await writeFile(
		path.join(projectPath, "src", "app", "globals.css"),
		globalsCSS
	);
}

/**
 * Scaffold Nuxt project
 */
async function scaffoldNuxt(projectName, language, spinner) {
	const args = ["nuxi", "init", projectName];

	await execa("npx", args, { stdio: ["pipe", "pipe", "inherit"] });
}

/**
 * Scaffold Express project
 */
async function scaffoldExpress(projectName, language, spinner) {
	const { mkdir, writeFile } = await import("fs/promises");
	const projectPath = path.resolve(CURRENT_DIR, projectName);

	// Create directory structure
	await mkdir(projectPath, { recursive: true });
	await mkdir(path.join(projectPath, "src"), { recursive: true });
	await mkdir(path.join(projectPath, "src", "routes"), { recursive: true });
	await mkdir(path.join(projectPath, "src", "controllers"), { recursive: true });
	await mkdir(path.join(projectPath, "src", "middleware"), { recursive: true });

	// Create package.json
	const packageJson = {
		name: projectName,
		version: "1.0.0",
		description: "Express API server",
		main: language === "ts" ? "dist/index.js" : "src/index.js",
		type: "module",
		scripts: {
			dev: language === "ts" ? "tsx watch src/index.ts" : "nodemon src/index.js",
			build: language === "ts" ? "tsc" : "echo 'No build step needed'",
			start: language === "ts" ? "node dist/index.js" : "node src/index.js",
		},
		keywords: ["express", "api", "backend"],
		author: "",
		license: "MIT",
		dependencies: {},
		devDependencies: {},
	};

	await writeFile(
		path.join(projectPath, "package.json"),
		JSON.stringify(packageJson, null, 2)
	);

	// Create index file
	const ext = language === "ts" ? "ts" : "js";
	const indexContent = language === "ts"
		? `import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
	console.log(\`Server running on http://localhost:\${PORT}\`);
});
`
		: `import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
	console.log(\`Server running on http://localhost:\${PORT}\`);
});
`;

	await writeFile(
		path.join(projectPath, "src", `index.${ext}`),
		indexContent
	);

	// Create .gitignore
	await writeFile(
		path.join(projectPath, ".gitignore"),
		`node_modules/
dist/
.env
.DS_Store
*.log
`
	);
}

/**
 * Scaffold Fastify project
 */
async function scaffoldFastify(projectName, language, spinner) {
	const { mkdir, writeFile } = await import("fs/promises");
	const projectPath = path.resolve(CURRENT_DIR, projectName);

	// Create directory structure
	await mkdir(projectPath, { recursive: true });
	await mkdir(path.join(projectPath, "src"), { recursive: true });
	await mkdir(path.join(projectPath, "src", "routes"), { recursive: true });
	await mkdir(path.join(projectPath, "src", "plugins"), { recursive: true });

	// Create package.json
	const packageJson = {
		name: projectName,
		version: "1.0.0",
		description: "Fastify API server",
		main: language === "ts" ? "dist/index.js" : "src/index.js",
		type: "module",
		scripts: {
			dev: language === "ts" ? "tsx watch src/index.ts" : "nodemon src/index.js",
			build: language === "ts" ? "tsc" : "echo 'No build step needed'",
			start: language === "ts" ? "node dist/index.js" : "node src/index.js",
		},
		keywords: ["fastify", "api", "backend"],
		author: "",
		license: "MIT",
		dependencies: {},
		devDependencies: {},
	};

	await writeFile(
		path.join(projectPath, "package.json"),
		JSON.stringify(packageJson, null, 2)
	);

	// Create index file
	const ext = language === "ts" ? "ts" : "js";
	const indexContent = language === "ts"
		? `import Fastify from 'fastify';

const fastify = Fastify({
	logger: true
});

fastify.get('/', async (request, reply) => {
	return { message: 'Hello from Fastify!' };
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
		console.log('Server running on http://localhost:3000');
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
`
		: `import Fastify from 'fastify';

const fastify = Fastify({
	logger: true
});

fastify.get('/', async (request, reply) => {
	return { message: 'Hello from Fastify!' };
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
		console.log('Server running on http://localhost:3000');
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
`;

	await writeFile(
		path.join(projectPath, "src", `index.${ext}`),
		indexContent
	);

	// Create .gitignore
	await writeFile(
		path.join(projectPath, ".gitignore"),
		`node_modules/
dist/
.env
.DS_Store
*.log
`
	);
}

