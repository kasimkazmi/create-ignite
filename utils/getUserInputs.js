/**
 * User input collection with improved prompts
 */

import prompts from "prompts";
import path from "path";
import os from "os";
import { readFile, writeFile, access } from "fs/promises";
import chalk from "chalk";
import {
	FRAMEWORKS,
	CSS_FRAMEWORKS,
	STATE_MANAGEMENT,
	LANGUAGES,
	PACKAGE_MANAGERS,
	PROJECT_TYPES,
	CONFIG_FILE_NAME,
} from "./constants.js";
import { validateConfiguration } from "./validators.js";

const configPath = path.join(os.homedir(), CONFIG_FILE_NAME);

export function onCancel() {
	console.log(chalk.yellow("\n[!] Operation cancelled by user"));
	process.exit(0);
}

/**
 * Load saved configuration
 */
async function loadConfig() {
	try {
		await access(configPath);
		const content = await readFile(configPath, "utf-8");
		return JSON.parse(content);
	} catch {
		return null;
	}
}

/**
 * Save configuration
 */
async function saveConfig(config) {
	try {
		await writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
	} catch (error) {
		console.warn(chalk.yellow("[!] Could not save configuration"));
	}
}

/**
 * Get user inputs with smart defaults
 */
export async function getUserInputs(projectName) {
	const savedConfig = await loadConfig();
	let useSavedConfig = false;

	// Ask if user wants to use saved config
	if (savedConfig) {
		console.log(chalk.cyan("\n[C] Previous configuration found:\n"));
		console.log(chalk.gray(`   Framework: ${chalk.white(savedConfig.framework || "N/A")}`));
		console.log(chalk.gray(`   Language: ${chalk.white(savedConfig.language || "N/A")}`));
		console.log(chalk.gray(`   CSS: ${chalk.white(savedConfig.cssFramework || "N/A")}`));
		console.log(chalk.gray(`   State Mgmt: ${chalk.white(savedConfig.stateManagement || "none")}`));
		
		const { useExisting } = await prompts(
			{
				type: "select",
				name: "useExisting",
				message: "How would you like to proceed?",
				choices: [
					{ title: "Use previous configuration", value: true },
					{ title: "Start fresh (new setup)", value: false },
				],
				initial: 0,
			},
			{ onCancel }
		);

		useSavedConfig = useExisting;
		if (useSavedConfig) {
			return { ...savedConfig, projectName };
		}
	}

	// Determine project type first
	const { projectType } = await prompts(
		{
			type: "select",
			name: "projectType",
			message: "What type of project do you want to create?",
			choices: [
				{
					title: "Frontend (SPA/SSR)",
					description: "React, Vue, Next.js, Nuxt",
					value: PROJECT_TYPES.FRONTEND,
				},
				{
					title: "Backend API",
					description: "Express, Fastify",
					value: PROJECT_TYPES.BACKEND,
				},
			{
				title: "Full-Stack Application",
				description: "Complete monorepo with frontend + backend",
				value: PROJECT_TYPES.FULLSTACK,
			},
			],
			initial: 0,
		},
		{ onCancel }
	);

	let framework, cssFramework, stateManagement, installRouter, installIcons, installAxios, language;

	// Frontend-specific prompts
	if (projectType === PROJECT_TYPES.FRONTEND) {
		const frontendAnswers = await prompts(
			[
				{
					type: "select",
					name: "framework",
					message: "Which framework do you want to use?",
					choices: [
						{
							title: "React (Vite)",
							description: "Fast, modern React with Vite",
							value: FRAMEWORKS.REACT,
						},
						{
							title: "Next.js",
							description: "The React framework for production",
							value: FRAMEWORKS.NEXTJS,
						},
						{
							title: "Vue 3 (Vite)",
							description: "Progressive JavaScript framework",
							value: FRAMEWORKS.VUE,
						},
						{
							title: "Nuxt 3",
							description: "The Intuitive Vue framework",
							value: FRAMEWORKS.NUXT,
						},
					],
					initial: 0,
				},
				{
					type: "select",
					name: "language",
					message: "Which language?",
					choices: [
						{ title: "TypeScript", value: LANGUAGES.TYPESCRIPT },
						{ title: "JavaScript", value: LANGUAGES.JAVASCRIPT },
					],
					initial: 0,
				},
				{
					type: "select",
					name: "cssFramework",
					message: "Which CSS framework?",
					choices: [
						{ title: "Tailwind CSS v4", value: CSS_FRAMEWORKS.TAILWIND },
						{ title: "Bootstrap 5", value: CSS_FRAMEWORKS.BOOTSTRAP },
						{ title: "Material-UI (MUI)", value: CSS_FRAMEWORKS.MATERIAL_UI },
						{ title: "Chakra UI", value: CSS_FRAMEWORKS.CHAKRA_UI },
						{ title: "None", value: CSS_FRAMEWORKS.NONE },
					],
					initial: 0,
				},
				{
					type: "select",
					name: "stateManagement",
					message: "State management library?",
					choices: (prev, values) => {
						const isReact = values.framework === FRAMEWORKS.REACT || values.framework === FRAMEWORKS.NEXTJS;
						const isVue = values.framework === FRAMEWORKS.VUE || values.framework === FRAMEWORKS.NUXT;

						if (isReact) {
							return [
								{ title: "None", value: STATE_MANAGEMENT.NONE },
								{ title: "Redux Toolkit", value: STATE_MANAGEMENT.REDUX },
								{ title: "Zustand", value: STATE_MANAGEMENT.ZUSTAND },
								{ title: "MobX", value: STATE_MANAGEMENT.MOBX },
							];
						} else if (isVue) {
							return [
								{ title: "None", value: STATE_MANAGEMENT.NONE },
								{ title: "Pinia (recommended)", value: STATE_MANAGEMENT.PINIA },
								{ title: "Vuex", value: STATE_MANAGEMENT.VUEX },
							];
						}
						return [{ title: "None", value: STATE_MANAGEMENT.NONE }];
					},
					initial: 0,
				},
				{
					type: "toggle",
					name: "installRouter",
					message: "Install router?",
					initial: true,
					active: "yes",
					inactive: "no",
				},
				{
					type: "toggle",
					name: "installIcons",
					message: "Install icon library?",
					initial: true,
					active: "yes",
					inactive: "no",
				},
				{
					type: "toggle",
					name: "installAxios",
					message: "Install Axios (HTTP client)?",
					initial: true,
					active: "yes",
					inactive: "no",
				},
			],
			{ onCancel }
		);

		framework = frontendAnswers.framework;
		cssFramework = frontendAnswers.cssFramework;
		stateManagement = frontendAnswers.stateManagement;
		installRouter = frontendAnswers.installRouter;
		installIcons = frontendAnswers.installIcons;
		installAxios = frontendAnswers.installAxios;
	}

	// Backend-specific prompts
	if (projectType === PROJECT_TYPES.BACKEND) {
		const backendAnswers = await prompts(
			[
				{
					type: "select",
					name: "framework",
					message: "Which backend framework?",
					choices: [
						{
							title: "Express",
							description: "Fast, unopinionated web framework",
							value: FRAMEWORKS.EXPRESS,
						},
						{
							title: "Fastify",
							description: "Fast and low overhead web framework",
							value: FRAMEWORKS.FASTIFY,
						},
					],
					initial: 0,
				},
				{
					type: "select",
					name: "language",
					message: "Which language?",
					choices: [
						{ title: "TypeScript", value: LANGUAGES.TYPESCRIPT },
						{ title: "JavaScript", value: LANGUAGES.JAVASCRIPT },
					],
					initial: 0,
				},
				{
					type: "toggle",
					name: "installCors",
					message: "Install CORS middleware?",
					initial: true,
					active: "yes",
					inactive: "no",
				},
				{
					type: "toggle",
					name: "installDotenv",
					message: "Install dotenv (environment variables)?",
					initial: true,
					active: "yes",
					inactive: "no",
				},
			],
			{ onCancel }
		);

		framework = backendAnswers.framework;
		cssFramework = CSS_FRAMEWORKS.NONE;
		stateManagement = STATE_MANAGEMENT.NONE;
		installRouter = false;
		installIcons = false;
		installAxios = false;
	}

	// Full-stack specific prompts
	if (projectType === PROJECT_TYPES.FULLSTACK) {
		const fullstackAnswers = await prompts(
			[
				{
					type: "select",
					name: "language",
					message: "Which language?",
					choices: [
						{ title: "TypeScript", value: LANGUAGES.TYPESCRIPT },
						{ title: "JavaScript", value: LANGUAGES.JAVASCRIPT },
					],
					initial: 0,
				},
				{
					type: "select",
					name: "cssFramework",
					message: "Which CSS framework for frontend?",
					choices: [
						{
							title: "Tailwind CSS v4",
							description: "Utility-first CSS with Vite plugin",
							value: CSS_FRAMEWORKS.TAILWIND,
						},
						{
							title: "Bootstrap 5",
							description: "Popular CSS framework",
							value: CSS_FRAMEWORKS.BOOTSTRAP,
						},
						{
							title: "None",
							description: "Vanilla CSS",
							value: CSS_FRAMEWORKS.NONE,
						},
					],
					initial: 0,
				},
				{
					type: "select",
					name: "stateManagement",
					message: "State management for frontend?",
					choices: [
						{
							title: "Redux Toolkit",
							description: "Official Redux with toolkit",
							value: STATE_MANAGEMENT.REDUX,
						},
						{
							title: "Zustand",
							description: "Simple and fast state management",
							value: STATE_MANAGEMENT.ZUSTAND,
						},
						{
							title: "None",
							description: "Use React hooks only",
							value: STATE_MANAGEMENT.NONE,
						},
					],
					initial: 0,
				},
			],
			{ onCancel }
		);

		framework = FRAMEWORKS.FULLSTACK;
		cssFramework = fullstackAnswers.cssFramework;
		stateManagement = fullstackAnswers.stateManagement;
		language = fullstackAnswers.language;
		installRouter = true;
		installIcons = true;
		installAxios = true;
	}

	// Common prompts
	const commonAnswers = await prompts(
		[
			{
				type: "select",
				name: "packageManager",
				message: "Which package manager?",
				choices: [
					{ title: "npm", value: PACKAGE_MANAGERS.NPM },
					{ title: "yarn", value: PACKAGE_MANAGERS.YARN },
					{ title: "pnpm", value: PACKAGE_MANAGERS.PNPM },
				],
				initial: 0,
			},
			{
				type: "toggle",
				name: "gitInit",
				message: "Initialize git repository?",
				initial: true,
				active: "yes",
				inactive: "no",
			},
			{
				type: "toggle",
				name: "installESLint",
				message: "Install ESLint?",
				initial: true,
				active: "yes",
				inactive: "no",
			},
			{
				type: "toggle",
				name: "installPrettier",
				message: "Install Prettier?",
				initial: true,
				active: "yes",
				inactive: "no",
			},
		],
		{ onCancel }
	);

	const config = {
		projectName,
		projectType,
		framework,
		language: commonAnswers.language || (await prompts({
			type: "select",
			name: "language",
			message: "Which language?",
			choices: [
				{ title: "TypeScript", value: LANGUAGES.TYPESCRIPT },
				{ title: "JavaScript", value: LANGUAGES.JAVASCRIPT },
			],
			initial: 0,
		}, { onCancel })).language,
		cssFramework,
		stateManagement,
		installRouter,
		installIcons,
		installAxios,
		packageManager: commonAnswers.packageManager,
		gitInit: commonAnswers.gitInit,
		installESLint: commonAnswers.installESLint,
		installPrettier: commonAnswers.installPrettier,
	};

	// Validate configuration
	const validationResult = validateConfiguration(config);
	if (validationResult !== true) {
		console.error(chalk.red(`\n[X] Configuration error: ${validationResult}`));
		process.exit(1);
	}

	// Save config for future use
	await saveConfig(config);

	return config;
}
