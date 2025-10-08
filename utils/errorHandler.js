/**
 * Centralized error handling
 */

import chalk from "chalk";
import { ERROR_MESSAGES } from "./constants.js";

export class ErrorHandler {
	/**
	 * Handle errors with user-friendly messages
	 * @param {Error} error - Error object
	 */
	static handle(error) {
		console.error("\n");
		console.error(chalk.red.bold("[X] Error occurred:"));
		console.error(chalk.red(error.message || "Unknown error"));

		// Provide helpful hints based on error type
		if (error.code === "EACCES") {
			console.error(chalk.yellow("\n[T] Tip: Try running with elevated privileges"));
		} else if (error.code === "ENOENT") {
			console.error(chalk.yellow("\n[T] Tip: File or directory not found. Check if path is correct"));
		} else if (error.message.includes("ENOTFOUND") || error.message.includes("network")) {
			console.error(chalk.yellow("\n[T] Tip: Check your internet connection and try again"));
		} else if (error.message.includes("npm") || error.message.includes("install")) {
			console.error(chalk.yellow("\n[T] Tip: Try clearing npm cache: npm cache clean --force"));
		}

		// Stack trace in debug mode
		if (process.env.DEBUG) {
			console.error("\n" + chalk.gray("Stack trace:"));
			console.error(chalk.gray(error.stack));
		} else {
			console.error(chalk.gray("\nRun with DEBUG=true for detailed error information"));
		}

		console.error("\n" + chalk.gray("If the problem persists, please report it at:"));
		console.error(chalk.blue("https://github.com/yourusername/create-ignite/issues\n"));
	}

	/**
	 * Create a custom error with context
	 * @param {string} message - Error message
	 * @param {string} code - Error code
	 * @returns {Error}
	 */
	static createError(message, code) {
		const error = new Error(message);
		error.code = code;
		return error;
	}

	/**
	 * Wrap async function with error handling
	 * @param {Function} fn - Async function to wrap
	 * @param {string} context - Context for better error messages
	 * @returns {Function}
	 */
	static wrapAsync(fn, context = "") {
		return async (...args) => {
			try {
				return await fn(...args);
			} catch (error) {
				if (context) {
					error.message = `${context}: ${error.message}`;
				}
				throw error;
			}
		};
	}

	/**
	 * Retry function with exponential backoff
	 * @param {Function} fn - Function to retry
	 * @param {number} maxRetries - Maximum number of retries
	 * @param {number} delay - Initial delay in ms
	 * @returns {Promise}
	 */
	static async retry(fn, maxRetries = 3, delay = 1000) {
		let lastError;
		
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn();
			} catch (error) {
				lastError = error;
				if (i < maxRetries - 1) {
					console.log(chalk.yellow(`\n⚠️  Attempt ${i + 1} failed. Retrying in ${delay}ms...`));
					await new Promise(resolve => setTimeout(resolve, delay));
					delay *= 2; // Exponential backoff
				}
			}
		}
		
		throw lastError;
	}
}

