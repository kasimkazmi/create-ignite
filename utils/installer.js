/**
 * Dependency installation logic
 */

import { execa } from "execa";
import chalk from "chalk";
import {
	FRAMEWORKS,
	CSS_FRAMEWORKS,
	STATE_MANAGEMENT,
	DEPENDENCY_VERSIONS,
	PACKAGE_MANAGERS,
} from "./constants.js";
import { ErrorHandler } from "./errorHandler.js";

/**
 * Install dependencies based on configuration
 * @param {Object} config - Project configuration
 * @param {Object} spinner - Ora spinner instance
 */
export async function installDependencies(config, spinner) {
	const {
		framework,
		language,
		cssFramework,
		stateManagement,
		installRouter,
		installIcons,
		installAxios,
		installESLint,
		installPrettier,
		packageManager,
	} = config;

	try {
		// Install base dependencies first
		spinner.text = chalk.cyan("Installing base dependencies...");
		await installBaseDependencies(packageManager, spinner);

		// Collect additional dependencies
		const dependencies = [];
		const devDependencies = [];

		// Framework-specific dependencies
		addFrameworkDependencies(framework, dependencies);

		// CSS framework dependencies
		addCSSFrameworkDependencies(cssFramework, framework, dependencies, devDependencies);

		// State management
		addStateManagementDependencies(stateManagement, dependencies);

		// Router
		if (installRouter) {
			addRouterDependencies(framework, dependencies);
		}

		// Icons
		if (installIcons) {
			dependencies.push("react-icons");
		}

		// Axios
		if (installAxios) {
			dependencies.push("axios");
		}

		// TypeScript
		if (language === "ts") {
			addTypeScriptDependencies(framework, devDependencies);
		}

		// ESLint
		if (installESLint) {
			addESLintDependencies(framework, devDependencies);
		}

		// Prettier
		if (installPrettier) {
			devDependencies.push("prettier");
		}

		// Backend-specific
		if (framework === FRAMEWORKS.EXPRESS || framework === FRAMEWORKS.FASTIFY) {
			addBackendDependencies(framework, language, dependencies, devDependencies);
		}

		// Install production dependencies
		if (dependencies.length > 0) {
			spinner.text = chalk.cyan(`Installing dependencies: ${dependencies.join(", ")}`);
			await installPackages(packageManager, dependencies, false);
		}

		// Install dev dependencies
		if (devDependencies.length > 0) {
			spinner.text = chalk.cyan(`Installing dev dependencies...`);
			await installPackages(packageManager, devDependencies, true);
		}

		spinner.text = chalk.green("Dependencies installed");

	} catch (error) {
		throw ErrorHandler.createError(
			`Failed to install dependencies: ${error.message}`,
			"INSTALL_FAILED"
		);
	}
}

/**
 * Install base dependencies
 */
async function installBaseDependencies(packageManager, spinner) {
	const cmd = packageManager === PACKAGE_MANAGERS.NPM ? "npm" : packageManager;
	await execa(cmd, ["install"], { stdio: "inherit" });
}

/**
 * Install packages
 */
async function installPackages(packageManager, packages, isDev = false) {
	if (packages.length === 0) return;

	const cmd = packageManager === PACKAGE_MANAGERS.NPM ? "npm" : packageManager;
	const args = packageManager === PACKAGE_MANAGERS.NPM ? ["install"] : ["add"];

	if (isDev) {
		args.push(packageManager === PACKAGE_MANAGERS.NPM ? "--save-dev" : "-D");
	}

	args.push(...packages);

	await ErrorHandler.retry(
		async () => await execa(cmd, args, { stdio: "inherit" }),
		3,
		2000
	);
}

/**
 * Add framework-specific dependencies
 */
function addFrameworkDependencies(framework, dependencies) {
	switch (framework) {
		case FRAMEWORKS.REACT:
			// Vite already includes React
			break;
		case FRAMEWORKS.VUE:
			// Vite already includes Vue
			break;
		case FRAMEWORKS.NEXTJS:
			// Next.js includes React
			break;
		case FRAMEWORKS.NUXT:
			// Nuxt includes Vue
			break;
		case FRAMEWORKS.EXPRESS:
			dependencies.push("express");
			break;
		case FRAMEWORKS.FASTIFY:
			dependencies.push("fastify");
			break;
	}
}

/**
 * Add CSS framework dependencies
 */
function addCSSFrameworkDependencies(cssFramework, framework, dependencies, devDependencies) {
	switch (cssFramework) {
		case CSS_FRAMEWORKS.TAILWIND:
			devDependencies.push("tailwindcss", "@tailwindcss/vite");
			break;
		case CSS_FRAMEWORKS.BOOTSTRAP:
			dependencies.push("bootstrap");
			break;
		case CSS_FRAMEWORKS.MATERIAL_UI:
			if (framework === FRAMEWORKS.REACT || framework === FRAMEWORKS.NEXTJS) {
				dependencies.push("@mui/material", "@emotion/react", "@emotion/styled");
			}
			break;
		case CSS_FRAMEWORKS.CHAKRA_UI:
			if (framework === FRAMEWORKS.REACT || framework === FRAMEWORKS.NEXTJS) {
				dependencies.push("@chakra-ui/react", "@emotion/react", "@emotion/styled");
			}
			break;
	}
}

/**
 * Add state management dependencies
 */
function addStateManagementDependencies(stateManagement, dependencies) {
	switch (stateManagement) {
		case STATE_MANAGEMENT.REDUX:
			dependencies.push("@reduxjs/toolkit", "react-redux");
			break;
		case STATE_MANAGEMENT.ZUSTAND:
			dependencies.push("zustand");
			break;
		case STATE_MANAGEMENT.PINIA:
			dependencies.push("pinia");
			break;
		case STATE_MANAGEMENT.VUEX:
			dependencies.push("vuex");
			break;
		case STATE_MANAGEMENT.MOBX:
			dependencies.push("mobx", "mobx-react-lite");
			break;
	}
}

/**
 * Add router dependencies
 */
function addRouterDependencies(framework, dependencies) {
	switch (framework) {
		case FRAMEWORKS.REACT:
			dependencies.push("react-router-dom");
			break;
		case FRAMEWORKS.VUE:
			dependencies.push("vue-router");
			break;
		// Next.js and Nuxt have built-in routing
	}
}

/**
 * Add TypeScript dependencies
 */
function addTypeScriptDependencies(framework, devDependencies) {
	devDependencies.push("typescript");

	if (framework === FRAMEWORKS.REACT) {
		devDependencies.push("@types/react", "@types/react-dom");
	} else if (framework === FRAMEWORKS.EXPRESS) {
		devDependencies.push("@types/node", "@types/express", "tsx");
	} else if (framework === FRAMEWORKS.FASTIFY) {
		devDependencies.push("@types/node", "tsx");
	}
}

/**
 * Add ESLint dependencies
 */
function addESLintDependencies(framework, devDependencies) {
	devDependencies.push("eslint");

	if (framework === FRAMEWORKS.REACT || framework === FRAMEWORKS.NEXTJS) {
		devDependencies.push("eslint-plugin-react", "eslint-plugin-react-hooks");
	} else if (framework === FRAMEWORKS.VUE || framework === FRAMEWORKS.NUXT) {
		devDependencies.push("eslint-plugin-vue");
	}
}

/**
 * Add backend-specific dependencies
 */
function addBackendDependencies(framework, language, dependencies, devDependencies) {
	dependencies.push("cors", "dotenv");
	
	if (language === "js") {
		devDependencies.push("nodemon");
	}
}

