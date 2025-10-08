/**
 * Logger utility for consistent logging
 */

import chalk from "chalk";
import prompts from "prompts";

export class Logger {
	constructor() {
		this.prefix = "🔥";
	}

	info(message) {
		console.log(chalk.blue(`${this.prefix} ${message}`));
	}

	success(message) {
		console.log(chalk.green(`✔ ${message}`));
	}

	warning(message) {
		console.log(chalk.yellow(`⚠️  ${message}`));
	}

	error(message) {
		console.error(chalk.red(`❌ ${message}`));
	}

	step(step, total, message) {
		console.log(chalk.cyan(`[${step}/${total}] ${message}`));
	}

	async prompt(questions) {
		const response = await prompts(questions, {
			onCancel: () => {
				this.warning("Operation cancelled by user");
				process.exit(0);
			},
		});
		return response.projectName || response;
	}

	divider() {
		console.log(chalk.gray("─".repeat(60)));
	}

	newLine() {
		console.log("");
	}
}

