/**
 * Validation utilities
 */

import chalk from "chalk";
import semver from "semver";
import validatePackageName from "validate-npm-package-name";
import { MIN_NODE_VERSION, ERROR_MESSAGES } from "./constants.js";

/**
 * Check if Node.js version is compatible
 */
export function checkNodeVersion() {
	const currentVersion = process.version;
	
	if (!semver.satisfies(currentVersion, `>=${MIN_NODE_VERSION}`)) {
		console.error(
			chalk.red(`\n❌ Error: ${ERROR_MESSAGES.NODE_VERSION_TOO_LOW}`)
		);
		console.error(chalk.yellow(`Current version: ${currentVersion}`));
		console.error(chalk.green(`Required version: ${MIN_NODE_VERSION}+\n`));
		process.exit(1);
	}
}

/**
 * Validate project name
 * @param {string} name - Project name to validate
 * @returns {boolean|string} - true if valid, error message if invalid
 */
export function validateProjectName(name) {
	if (!name) {
		return ERROR_MESSAGES.PROJECT_NAME_REQUIRED;
	}

	// Check npm package name validity
	const validation = validatePackageName(name);
	
	if (!validation.validForNewPackages) {
		const errors = [
			...(validation.errors || []),
			...(validation.warnings || []),
		];
		return errors[0] || ERROR_MESSAGES.INVALID_PROJECT_NAME;
	}

	// Additional checks
	if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
		return ERROR_MESSAGES.INVALID_PROJECT_NAME;
	}

	return true;
}

/**
 * Check if port is available
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>}
 */
export async function isPortAvailable(port) {
	const { default: getPort } = await import("get-port");
	const availablePort = await getPort({ port });
	return availablePort === port;
}

/**
 * Validate framework and feature compatibility
 * @param {Object} config - Project configuration
 * @returns {boolean|string}
 */
export function validateConfiguration(config) {
	const { framework, cssFramework, stateManagement } = config;

	// Vue-specific state management
	if (framework === "vue" || framework === "nuxt") {
		if (stateManagement === "redux" || stateManagement === "zustand") {
			return "Redux and Zustand are not compatible with Vue. Use Pinia or Vuex instead.";
		}
	}

	// React-specific state management
	if (framework === "react" || framework === "nextjs") {
		if (stateManagement === "pinia" || stateManagement === "vuex") {
			return "Pinia and Vuex are not compatible with React. Use Redux or Zustand instead.";
		}
	}

	// Backend framework checks
	if (framework === "express" || framework === "fastify") {
		if (cssFramework !== "none") {
			return "CSS frameworks are not applicable for backend projects.";
		}
	}

	return true;
}

