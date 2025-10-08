/**
 * Framework-specific configuration
 */

import { readFile, writeFile, access } from "fs/promises";
import path from "path";
import chalk from "chalk";
import { FRAMEWORKS, CSS_FRAMEWORKS } from "./constants.js";
import { ErrorHandler } from "./errorHandler.js";

const TEMPLATES_DIR = path.join(process.cwd(), "..", "..", "templates");

/**
 * Setup framework-specific configuration
 * @param {Object} config - Project configuration
 * @param {Object} spinner - Ora spinner instance
 */
export async function setupFramework(config, spinner) {
	const { framework, language, cssFramework } = config;

	try {
		spinner.text = chalk.cyan("Configuring framework...");

		// Setup CSS framework
		await setupCSSFramework(framework, language, cssFramework);

		// Setup App component
		await setupAppComponent(framework, language, cssFramework);

		// Setup additional configuration files
		await setupConfigFiles(config);

		spinner.text = chalk.green("Framework configured");

	} catch (error) {
		throw ErrorHandler.createError(
			`Failed to setup framework: ${error.message}`,
			"FRAMEWORK_SETUP_FAILED"
		);
	}
}

/**
 * Setup CSS framework configuration
 */
async function setupCSSFramework(framework, language, cssFramework) {
	if (cssFramework === CSS_FRAMEWORKS.NONE) return;

	switch (cssFramework) {
		case CSS_FRAMEWORKS.TAILWIND:
			await setupTailwind(framework, language);
			break;
		case CSS_FRAMEWORKS.BOOTSTRAP:
			await setupBootstrap(framework, language);
			break;
		case CSS_FRAMEWORKS.MATERIAL_UI:
			await setupMaterialUI(framework, language);
			break;
		case CSS_FRAMEWORKS.CHAKRA_UI:
			await setupChakraUI(framework, language);
			break;
	}
}

/**
 * Setup Tailwind CSS
 */
async function setupTailwind(framework, language) {
	const ext = language === "ts" ? "ts" : "js";

	// Update vite.config
	if (framework === FRAMEWORKS.REACT || framework === FRAMEWORKS.VUE) {
		const viteConfigPath = path.join(process.cwd(), `vite.config.${ext}`);
		
		try {
			let viteConfig = await readFile(viteConfigPath, "utf-8");
			
			// Add Tailwind plugin import
			if (!viteConfig.includes("@tailwindcss/vite")) {
				const importLine = 'import tailwindcss from "@tailwindcss/vite";\n';
				viteConfig = importLine + viteConfig;
				
				// Add plugin to plugins array
				viteConfig = viteConfig.replace(
					/plugins:\s*\[(.*?)\]/s,
					'plugins: [$1, tailwindcss()]'
				);
				
				await writeFile(viteConfigPath, viteConfig, "utf-8");
			}
		} catch (error) {
			console.warn(chalk.yellow("⚠️  Could not update vite.config. Please add Tailwind plugin manually."));
		}
	}

	// Update index.css or main CSS file
	const cssPath = path.join(process.cwd(), "src", "index.css");
	
	try {
		await writeFile(cssPath, '@import "tailwindcss";\n', "utf-8");
	} catch (error) {
		console.warn(chalk.yellow("⚠️  Could not create index.css. Please add Tailwind import manually."));
	}
}

/**
 * Setup Bootstrap
 */
async function setupBootstrap(framework, language) {
	const ext = language === "ts" ? "tsx" : "jsx";
	const mainFilePath = path.join(process.cwd(), "src", `main.${ext}`);

	try {
		let mainContent = await readFile(mainFilePath, "utf-8");
		
		if (!mainContent.includes("bootstrap")) {
			mainContent = `import 'bootstrap/dist/css/bootstrap.min.css';\n` + mainContent;
			await writeFile(mainFilePath, mainContent, "utf-8");
		}

		// Clear index.css
		const cssPath = path.join(process.cwd(), "src", "index.css");
		try {
			await writeFile(cssPath, "", "utf-8");
		} catch {}

	} catch (error) {
		console.warn(chalk.yellow("⚠️  Could not setup Bootstrap. Please import manually."));
	}
}

/**
 * Setup Material-UI
 */
async function setupMaterialUI(framework, language) {
	// Material-UI setup is mostly done through imports in components
	console.log(chalk.gray("   Material-UI ready to use. Import components as needed."));
}

/**
 * Setup Chakra UI
 */
async function setupChakraUI(framework, language) {
	// Chakra UI setup requires provider wrapper
	console.log(chalk.gray("   Chakra UI ready to use. Wrap your app with ChakraProvider."));
}

/**
 * Setup App component with appropriate template
 */
async function setupAppComponent(framework, language, cssFramework) {
	const ext = language === "ts" ? "tsx" : "jsx";
	let appFilePath;

	// Determine App component path
	if (framework === FRAMEWORKS.REACT) {
		appFilePath = path.join(process.cwd(), "src", `App.${ext}`);
	} else if (framework === FRAMEWORKS.VUE) {
		appFilePath = path.join(process.cwd(), "src", "App.vue");
	} else {
		return; // Next.js and Nuxt have different structure
	}

	try {
		const appContent = generateAppComponent(framework, language, cssFramework);
		await writeFile(appFilePath, appContent, "utf-8");
	} catch (error) {
		console.warn(chalk.yellow("⚠️  Could not update App component"));
	}
}

/**
 * Generate App component content
 */
function generateAppComponent(framework, language, cssFramework) {
	if (framework === FRAMEWORKS.REACT) {
		return generateReactApp(cssFramework);
	} else if (framework === FRAMEWORKS.VUE) {
		return generateVueApp(cssFramework);
	}
	return "";
}

/**
 * Generate React App component
 */
function generateReactApp(cssFramework) {
	const classNames = {
		[CSS_FRAMEWORKS.TAILWIND]: 'className="min-h-screen flex bg-gradient-to-br from-blue-500 to-purple-600 text-white items-center justify-center text-3xl font-bold"',
		[CSS_FRAMEWORKS.BOOTSTRAP]: 'className="d-flex bg-dark text-white align-items-center justify-content-center" style={{ height: "100vh", fontSize: "2rem", fontWeight: "bold" }}',
		[CSS_FRAMEWORKS.NONE]: 'style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to bottom right, #3b82f6, #9333ea)", color: "white", fontSize: "2rem", fontWeight: "bold" }}',
	};

	const className = classNames[cssFramework] || classNames[CSS_FRAMEWORKS.NONE];

	return `function App() {
	return (
		<div ${className}>
			<div className="text-center">
				<h1>🚀 Welcome to Your App!</h1>
				<p style={{ fontSize: "1rem", marginTop: "1rem", opacity: 0.9 }}>
					Built with React + Vite ${cssFramework !== CSS_FRAMEWORKS.NONE ? `+ ${cssFramework}` : ''}
				</p>
			</div>
		</div>
	);
}

export default App;
`;
}

/**
 * Generate Vue App component
 */
function generateVueApp(cssFramework) {
	const classes = {
		[CSS_FRAMEWORKS.TAILWIND]: 'class="min-h-screen flex bg-gradient-to-br from-blue-500 to-purple-600 text-white items-center justify-center text-3xl font-bold"',
		[CSS_FRAMEWORKS.BOOTSTRAP]: 'class="d-flex bg-dark text-white align-items-center justify-content-center" style="height: 100vh; font-size: 2rem; font-weight: bold"',
		[CSS_FRAMEWORKS.NONE]: 'style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(to bottom right, #3b82f6, #9333ea); color: white; font-size: 2rem; font-weight: bold"',
	};

	const className = classes[cssFramework] || classes[CSS_FRAMEWORKS.NONE];

	return `<template>
	<div ${className}>
		<div class="text-center">
			<h1>🚀 Welcome to Your App!</h1>
			<p style="font-size: 1rem; margin-top: 1rem; opacity: 0.9">
				Built with Vue 3 + Vite ${cssFramework !== CSS_FRAMEWORKS.NONE ? `+ ${cssFramework}` : ''}
			</p>
		</div>
	</div>
</template>

<script setup>
// Your Vue component logic here
</script>

<style scoped>
.text-center {
	text-align: center;
}
</style>
`;
}

/**
 * Setup additional configuration files
 */
async function setupConfigFiles(config) {
	const { installESLint, installPrettier, language } = config;

	// Setup ESLint
	if (installESLint) {
		await setupESLintConfig(config);
	}

	// Setup Prettier
	if (installPrettier) {
		await setupPrettierConfig();
	}

	// Setup TypeScript
	if (language === "ts") {
		await setupTypeScriptConfig(config);
	}

	// Setup .env
	await setupEnvFile(config);
}

/**
 * Setup ESLint configuration
 */
async function setupESLintConfig(config) {
	const eslintConfig = {
		env: {
			browser: true,
			es2021: true,
			node: true,
		},
		extends: ["eslint:recommended"],
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {},
	};

	try {
		await writeFile(
			path.join(process.cwd(), ".eslintrc.json"),
			JSON.stringify(eslintConfig, null, 2),
			"utf-8"
		);
	} catch (error) {
		console.warn(chalk.yellow("⚠️  Could not create ESLint config"));
	}
}

/**
 * Setup Prettier configuration
 */
async function setupPrettierConfig() {
	const prettierConfig = {
		semi: true,
		trailingComma: "es5",
		singleQuote: false,
		printWidth: 100,
		tabWidth: 2,
		useTabs: true,
	};

	try {
		await writeFile(
			path.join(process.cwd(), ".prettierrc.json"),
			JSON.stringify(prettierConfig, null, 2),
			"utf-8"
		);
	} catch (error) {
		console.warn(chalk.yellow("⚠️  Could not create Prettier config"));
	}
}

/**
 * Setup TypeScript configuration
 */
async function setupTypeScriptConfig(config) {
	// TypeScript config is usually created by the scaffolding tool
	// We can enhance it here if needed
}

/**
 * Setup .env file
 */
async function setupEnvFile(config) {
	const { framework } = config;

	if (framework === FRAMEWORKS.EXPRESS || framework === FRAMEWORKS.FASTIFY) {
		const envContent = `# Server Configuration
PORT=3000
NODE_ENV=development

# Database (uncomment and configure as needed)
# DATABASE_URL=

# API Keys (uncomment and add your keys)
# API_KEY=
`;

		try {
			await writeFile(path.join(process.cwd(), ".env"), envContent, "utf-8");
			await writeFile(path.join(process.cwd(), ".env.example"), envContent, "utf-8");
		} catch (error) {
			console.warn(chalk.yellow("⚠️  Could not create .env file"));
		}
	}
}

