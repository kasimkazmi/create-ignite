#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";
import { checkNodeVersion } from "../utils/validators.js";
import { displayBanner } from "../utils/banner.js";
import { getUserInputs, onCancel } from "../utils/getUserInputs.js";
import { confirmEmptyFolder } from "../utils/confirmEmptyFolder.js";
import { scaffoldProject } from "../utils/scaffolder.js";
import { installDependencies } from "../utils/installer.js";
import { setupFramework } from "../utils/setupFramework.js";
import { cleanupProject } from "../utils/cleanup.js";
import { printSuccessMessage } from "../utils/messages.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger();

/**
 * Main CLI function
 */
async function main() {
	try {
		// Check Node.js version
		checkNodeVersion();

		// Display banner
		displayBanner();

		// Get project name
		logger.info("\n[I] Let's create your project!\n");
		
		const projectName = await logger.prompt({
			type: "text",
			name: "projectName",
			message: "Project name:",
			validate: (name) => {
				if (!name) return "Project name is required!";
				if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
					return "Project name can only contain letters, numbers, dashes, and underscores";
				}
				return true;
			},
		});

		// Confirm empty folder
		await confirmEmptyFolder(projectName);

		// Get user configuration
		const config = await getUserInputs(projectName);

		// Start scaffolding
		const spinner = ora({
			text: chalk.cyan("Setting up your project..."),
			spinner: "dots",
		}).start();

		try {
			// Scaffold project structure
			await scaffoldProject(config, spinner);

			// Install dependencies
			await installDependencies(config, spinner);

			// Setup framework-specific configuration
			await setupFramework(config, spinner);

			// Cleanup unnecessary files
			await cleanupProject(config, spinner);

			spinner.succeed(chalk.green("* Project created successfully!"));

			// Print success message with instructions
			await printSuccessMessage(config);

		} catch (error) {
			spinner.fail(chalk.red("Project setup failed"));
			throw error;
		}

	} catch (error) {
		ErrorHandler.handle(error);
		process.exit(1);
	}
}

// Handle process signals
process.on("SIGINT", () => {
	console.log(chalk.yellow("\n\n[!] Process interrupted by user"));
	process.exit(0);
});

process.on("SIGTERM", () => {
	console.log(chalk.yellow("\n\n[!] Process terminated"));
	process.exit(0);
});

process.on("uncaughtException", (error) => {
	console.error(chalk.red("\n\n[X] Uncaught Exception:"), error);
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error(chalk.red("\n\n[X] Unhandled Rejection at:"), promise, "reason:", reason);
	process.exit(1);
});

// Run CLI
main().catch((error) => {
	ErrorHandler.handle(error);
	process.exit(1);
});
