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

	await execa("npx", args, { stdio: ["pipe", "pipe", "inherit"] });
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

