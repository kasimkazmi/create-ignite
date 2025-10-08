/**
 * Success messages and next steps
 */

import chalk from "chalk";
import gradient from "gradient-string";
import { execa } from "execa";
import { FRAMEWORKS, CSS_FRAMEWORKS, LINKS, PACKAGE_MANAGERS } from "./constants.js";

/**
 * Print success message with next steps
 * @param {Object} config - Project configuration
 */
export async function printSuccessMessage(config) {
	const {
		projectName,
		framework,
		language,
		cssFramework,
		stateManagement,
		packageManager,
		gitInit,
	} = config;

	console.log("\n");
	console.log(gradient.pastel("═".repeat(60)));
	console.log(gradient.pastel.bold("\n  🎉 SUCCESS! Your project is ready! 🎉\n"));
	console.log(gradient.pastel("═".repeat(60)));
	console.log("\n");

	// Project info
	console.log(chalk.bold("📦 Project Information:\n"));
	console.log(chalk.gray("   Name:         ") + chalk.cyan(projectName));
	console.log(chalk.gray("   Framework:    ") + chalk.cyan(framework));
	console.log(chalk.gray("   Language:     ") + chalk.cyan(language === "ts" ? "TypeScript" : "JavaScript"));
	console.log(chalk.gray("   CSS:          ") + chalk.cyan(cssFramework || "none"));
	console.log(chalk.gray("   State Mgmt:   ") + chalk.cyan(stateManagement || "none"));
	console.log(chalk.gray("   Git:          ") + chalk.cyan(gitInit ? "Initialized" : "Not initialized"));
	console.log("\n");

	// Next steps
	console.log(chalk.bold("🚀 Next Steps:\n"));
	console.log(chalk.cyan("   1. ") + chalk.white(`cd ${projectName}`));
	
	const pmRun = packageManager === PACKAGE_MANAGERS.NPM ? "npm run" : packageManager;
	console.log(chalk.cyan("   2. ") + chalk.white(`${pmRun} dev`));
	console.log("\n");

	// Available commands
	console.log(chalk.bold("📝 Available Commands:\n"));
	console.log(chalk.gray(`   ${pmRun} dev      `) + chalk.white("- Start development server"));
	console.log(chalk.gray(`   ${pmRun} build    `) + chalk.white("- Build for production"));
	console.log(chalk.gray(`   ${pmRun} preview  `) + chalk.white("- Preview production build"));
	console.log("\n");

	// Documentation links
	console.log(chalk.bold("📚 Useful Documentation:\n"));
	printDocumentationLinks(framework, cssFramework, stateManagement);
	console.log("\n");

	// Tips
	printTips(config);

	console.log(chalk.gray("─".repeat(60)));
	console.log(chalk.green.bold("\n  ✨ Happy coding! ✨\n"));
	console.log(chalk.gray("─".repeat(60)));
	console.log("\n");

	// Optionally start dev server
	const shouldStart = await promptStartServer();
	if (shouldStart) {
		console.log(chalk.cyan("\n🔥 Starting development server...\n"));
		await startDevServer(packageManager);
	}
}

/**
 * Print documentation links
 */
function printDocumentationLinks(framework, cssFramework, stateManagement) {
	const links = [];

	// Framework
	switch (framework) {
		case FRAMEWORKS.REACT:
			links.push({ name: "React", url: LINKS.REACT });
			links.push({ name: "Vite", url: LINKS.VITE });
			break;
		case FRAMEWORKS.VUE:
			links.push({ name: "Vue", url: LINKS.VUE });
			links.push({ name: "Vite", url: LINKS.VITE });
			break;
		case FRAMEWORKS.NEXTJS:
			links.push({ name: "Next.js", url: LINKS.NEXTJS });
			break;
		case FRAMEWORKS.NUXT:
			links.push({ name: "Nuxt", url: LINKS.NUXT });
			break;
		case FRAMEWORKS.EXPRESS:
			links.push({ name: "Express", url: LINKS.EXPRESS });
			break;
		case FRAMEWORKS.FASTIFY:
			links.push({ name: "Fastify", url: LINKS.FASTIFY });
			break;
	}

	// CSS Framework
	switch (cssFramework) {
		case CSS_FRAMEWORKS.TAILWIND:
			links.push({ name: "Tailwind CSS", url: LINKS.TAILWIND });
			break;
		case CSS_FRAMEWORKS.BOOTSTRAP:
			links.push({ name: "Bootstrap", url: LINKS.BOOTSTRAP });
			break;
		case CSS_FRAMEWORKS.MATERIAL_UI:
			links.push({ name: "Material-UI", url: LINKS.MATERIAL_UI });
			break;
		case CSS_FRAMEWORKS.CHAKRA_UI:
			links.push({ name: "Chakra UI", url: LINKS.CHAKRA_UI });
			break;
	}

	// State Management
	switch (stateManagement) {
		case "redux":
			links.push({ name: "Redux Toolkit", url: LINKS.REDUX });
			break;
		case "zustand":
			links.push({ name: "Zustand", url: LINKS.ZUSTAND });
			break;
		case "pinia":
			links.push({ name: "Pinia", url: LINKS.PINIA });
			break;
	}

	// Print links
	links.forEach((link) => {
		console.log(chalk.gray(`   • ${link.name}: `) + chalk.blue(link.url));
	});
}

/**
 * Print helpful tips
 */
function printTips(config) {
	const { framework, cssFramework, installESLint, installPrettier } = config;

	console.log(chalk.bold("💡 Tips:\n"));

	// Framework-specific tips
	if (framework === FRAMEWORKS.REACT) {
		console.log(chalk.gray("   • Use React DevTools browser extension for debugging"));
	} else if (framework === FRAMEWORKS.VUE) {
		console.log(chalk.gray("   • Use Vue DevTools browser extension for debugging"));
	}

	// CSS Framework tips
	if (cssFramework === CSS_FRAMEWORKS.TAILWIND) {
		console.log(chalk.gray("   • Use Tailwind CSS IntelliSense VSCode extension"));
		console.log(chalk.gray("   • Configure your editor for Tailwind autocomplete"));
	}

	// Linting tips
	if (installESLint) {
		console.log(chalk.gray("   • Run 'npm run lint' to check code quality"));
	}

	if (installPrettier) {
		console.log(chalk.gray("   • Configure your editor to format on save"));
	}

	// General tips
	console.log(chalk.gray("   • Check package.json for all available scripts"));
	console.log(chalk.gray("   • Read the documentation links above to get started"));
}

/**
 * Prompt to start dev server
 */
async function promptStartServer() {
	try {
		const prompts = (await import("prompts")).default;
		const { start } = await prompts({
			type: "confirm",
			name: "start",
			message: "Would you like to start the development server now?",
			initial: true,
		});
		return start;
	} catch {
		return false;
	}
}

/**
 * Start development server
 */
async function startDevServer(packageManager) {
	const cmd = packageManager === PACKAGE_MANAGERS.NPM ? "npm" : packageManager;
	const args = packageManager === PACKAGE_MANAGERS.NPM ? ["run", "dev"] : ["dev"];

	try {
		await execa(cmd, args, { stdio: "inherit" });
	} catch (error) {
		console.error(chalk.red("\n❌ Failed to start development server"));
		console.log(chalk.yellow(`\nYou can start it manually with: ${cmd} ${args.join(" ")}\n`));
	}
}

