/**
 * Folder validation and cleanup
 */

import { access, mkdir, readdir, rm } from "fs/promises";
import path from "path";
import prompts from "prompts";
import chalk from "chalk";
import { onCancel } from "./getUserInputs.js";

/**
 * Confirm and handle non-empty folder
 * @param {string} projectName - Project name
 * @returns {Promise<string>} - Target path
 */
export async function confirmEmptyFolder(projectName) {
	const cwd = process.cwd();
	const targetPath = path.resolve(cwd, projectName || "");

	// Check if folder exists
	try {
		await access(targetPath);
	} catch {
		// Folder doesn't exist, all good
		return targetPath;
	}

	// Check if folder is empty
	const files = await readdir(targetPath);
	if (files.length === 0) {
		return targetPath;
	}

	// Folder exists and is not empty
	console.log(chalk.yellow(`\n⚠️  Folder "${projectName}" already exists and is not empty`));
	console.log(chalk.gray(`   Path: ${targetPath}`));
	console.log(chalk.gray(`   Files: ${files.length} items found\n`));

	const { action } = await prompts(
		{
			type: "select",
			name: "action",
			message: "How would you like to proceed?",
			choices: [
				{
					title: "Cancel setup",
					description: "Exit without making changes",
					value: "cancel",
				},
				{
					title: "Delete all files and continue",
					description: "⚠️  This will permanently delete all files in the folder",
					value: "delete",
				},
				{
					title: "Use a different name",
					description: "Choose a different project name",
					value: "rename",
				},
			],
			initial: 0,
		},
		{ onCancel }
	);

	if (action === "cancel") {
		console.log(chalk.yellow("Setup cancelled"));
		process.exit(0);
	}

	if (action === "rename") {
		const { newName } = await prompts(
			{
				type: "text",
				name: "newName",
				message: "Enter new project name:",
				validate: (name) => {
					if (!name) return "Project name is required";
					if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
						return "Project name can only contain letters, numbers, dashes, and underscores";
					}
					return true;
				},
			},
			{ onCancel }
		);
		return confirmEmptyFolder(newName);
	}

	if (action === "delete") {
		// Double confirmation for delete
		const { confirm } = await prompts(
			{
				type: "confirm",
				name: "confirm",
				message: chalk.red("Are you absolutely sure? This cannot be undone!"),
				initial: false,
			},
			{ onCancel }
		);

		if (!confirm) {
			console.log(chalk.yellow("Setup cancelled"));
			process.exit(0);
		}

		console.log(chalk.cyan("\n🗑️  Cleaning folder..."));

		// Delete all contents
		if (targetPath === cwd) {
			// If current directory, delete contents but not the directory itself
			const items = await readdir(targetPath);
			await Promise.all(
				items.map((name) =>
					rm(path.join(targetPath, name), {
						recursive: true,
						force: true,
					})
				)
			);
		} else {
			// Delete entire directory and recreate
			await rm(targetPath, { recursive: true, force: true });
			await mkdir(targetPath, { recursive: true });
		}

		console.log(chalk.green(`✔ Folder cleaned: ${projectName}\n`));
	}

	return targetPath;
}
