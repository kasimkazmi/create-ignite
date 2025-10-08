/**
 * Cleanup unnecessary files
 */

import { access, rm, readdir, unlink, stat } from "fs/promises";
import path from "path";
import chalk from "chalk";
import { FRAMEWORKS } from "./constants.js";

/**
 * Clean up project files
 * @param {Object} config - Project configuration
 * @param {Object} spinner - Ora spinner instance
 */
export async function cleanupProject(config, spinner) {
	const { framework } = config;

	try {
		spinner.text = chalk.cyan("Cleaning up unnecessary files...");

		// Clean based on framework
		switch (framework) {
			case FRAMEWORKS.REACT:
			case FRAMEWORKS.VUE:
				await cleanupViteProject();
				break;
			case FRAMEWORKS.NEXTJS:
				await cleanupNextProject();
				break;
			case FRAMEWORKS.NUXT:
				await cleanupNuxtProject();
				break;
			// Backend projects don't need cleanup
		}

		spinner.text = chalk.green("Cleanup complete");

	} catch (error) {
		console.warn(chalk.yellow("⚠️  Some files could not be cleaned up"));
	}
}

/**
 * Clean up Vite-based projects
 */
async function cleanupViteProject() {
	const filesToDelete = [
		path.join(process.cwd(), "src", "App.css"),
		path.join(process.cwd(), "src", "logo.svg"),
		path.join(process.cwd(), "public", "vite.svg"),
	];

	const dirsToClean = [
		path.join(process.cwd(), "src", "assets"),
		path.join(process.cwd(), "public"),
	];

	// Delete specific files
	for (const file of filesToDelete) {
		await deleteIfExists(file);
	}

	// Clean directories (keep the dirs, delete contents)
	for (const dir of dirsToClean) {
		await cleanDirectory(dir);
	}
}

/**
 * Clean up Next.js project
 */
async function cleanupNextProject() {
	const filesToDelete = [
		path.join(process.cwd(), "public", "vercel.svg"),
		path.join(process.cwd(), "public", "next.svg"),
	];

	for (const file of filesToDelete) {
		await deleteIfExists(file);
	}
}

/**
 * Clean up Nuxt project
 */
async function cleanupNuxtProject() {
	// Nuxt projects are usually clean by default
	const publicDir = path.join(process.cwd(), "public");
	await cleanDirectory(publicDir);
}

/**
 * Delete file if it exists
 * @param {string} filePath - Path to file
 */
async function deleteIfExists(filePath) {
	try {
		await access(filePath);
		const stats = await stat(filePath);
		
		if (stats.isDirectory()) {
			await rm(filePath, { recursive: true, force: true });
		} else {
			await unlink(filePath);
		}
	} catch {
		// File doesn't exist, ignore
	}
}

/**
 * Clean directory contents but keep the directory
 * @param {string} dirPath - Path to directory
 */
async function cleanDirectory(dirPath) {
	try {
		await access(dirPath);
		const files = await readdir(dirPath);

		for (const file of files) {
			const filePath = path.join(dirPath, file);
			const stats = await stat(filePath);

			if (stats.isDirectory()) {
				await rm(filePath, { recursive: true, force: true });
			} else {
				await unlink(filePath);
			}
		}
	} catch {
		// Directory doesn't exist, ignore
	}
}

