/**
 * Banner and welcome message with enhanced styling
 */

import chalk from "chalk";

export function displayBanner() {
	console.log();
	console.log();
	console.log(chalk.bold.red("        ██████╗") + chalk.bold.yellow(" ██████╗") + chalk.bold.green(" ███████╗") + chalk.bold.cyan(" █████╗") + chalk.bold.blue(" ████████╗") + chalk.bold.magenta(" ███████╗"));
	console.log(chalk.bold.red("       ██╔════╝") + chalk.bold.yellow(" ██╔══██╗") + chalk.bold.green(" ██╔════╝") + chalk.bold.cyan(" ██╔══██╗") + chalk.bold.blue(" ╚══██╔══╝") + chalk.bold.magenta(" ██╔════╝"));
	console.log(chalk.bold.red("       ██║") + chalk.bold.yellow("      ██████╔╝") + chalk.bold.green(" █████╗") + chalk.bold.cyan("   ███████║") + chalk.bold.blue("    ██║") + chalk.bold.magenta("    █████╗"));
	console.log(chalk.bold.red("       ██║") + chalk.bold.yellow("      ██╔══██╗") + chalk.bold.green(" ██╔══╝") + chalk.bold.cyan("   ██╔══██║") + chalk.bold.blue("    ██║") + chalk.bold.magenta("    ██╔══╝"));
	console.log(chalk.bold.red("       ╚██████╗") + chalk.bold.yellow(" ██║  ██║") + chalk.bold.green(" ███████╗") + chalk.bold.cyan(" ██║  ██║") + chalk.bold.blue("    ██║") + chalk.bold.magenta("    ███████╗"));
	console.log(chalk.bold.red("        ╚═════╝") + chalk.bold.yellow(" ╚═╝  ╚═╝") + chalk.bold.green(" ╚══════╝") + chalk.bold.cyan(" ╚═╝  ╚═╝") + chalk.bold.blue("    ╚═╝") + chalk.bold.magenta("    ╚══════╝"));
	console.log();
	console.log(chalk.bold.yellow("                              ██╗") + chalk.bold.red(" ██████╗") + chalk.bold.blue("  ███╗   ██╗") + chalk.bold.green(" ██╗") + chalk.bold.cyan(" ████████╗") + chalk.bold.magenta(" ███████╗"));
	console.log(chalk.bold.yellow("                              ██║") + chalk.bold.red(" ██╔════╝") + chalk.bold.blue("  ████╗  ██║") + chalk.bold.green(" ██║") + chalk.bold.cyan(" ╚══██╔══╝") + chalk.bold.magenta(" ██╔════╝"));
	console.log(chalk.bold.yellow("                              ██║") + chalk.bold.red(" ██║  ███╗") + chalk.bold.blue(" ██╔██╗ ██║") + chalk.bold.green(" ██║") + chalk.bold.cyan("    ██║") + chalk.bold.magenta("    █████╗"));
	console.log(chalk.bold.yellow("                              ██║") + chalk.bold.red(" ██║   ██║") + chalk.bold.blue(" ██║╚██╗██║") + chalk.bold.green(" ██║") + chalk.bold.cyan("    ██║") + chalk.bold.magenta("    ██╔══╝"));
	console.log(chalk.bold.yellow("                              ██║") + chalk.bold.red(" ╚██████╔╝") + chalk.bold.blue(" ██║ ╚████║") + chalk.bold.green(" ██║") + chalk.bold.cyan("    ██║") + chalk.bold.magenta("    ███████╗"));
	console.log(chalk.bold.yellow("                              ╚═╝") + chalk.bold.red("  ╚═════╝") + chalk.bold.blue("  ╚═╝  ╚═══╝") + chalk.bold.green(" ╚═╝") + chalk.bold.cyan("    ╚═╝") + chalk.bold.magenta("    ╚══════╝"));
	console.log();
	console.log(chalk.hex("#FF6B6B")("                        * ") + chalk.bold.white("Spark Your Next Big Idea in Seconds") + chalk.hex("#FF6B6B")(" *"));
	console.log();
	console.log(chalk.hex("#4ECDC4")("            [R] React") + chalk.gray("    •") + chalk.hex("#42B883")("    [V] Vue") + chalk.gray("    •") + chalk.hex("#FFFFFF")("    [N] Next.js") + chalk.gray("    •") + chalk.hex("#00DC82")("    [N] Nuxt"));
	console.log(chalk.hex("#FFFFFF")("            [E] Express") + chalk.gray("  •") + chalk.hex("#FFFFFF")("    [F] Fastify") + chalk.gray("  •") + chalk.hex("#3178C6")("    [T] TypeScript") + chalk.gray("  •") + chalk.hex("#F7DF1E")("    [E] ESLint"));
	console.log();
	console.log(chalk.bold.hex("#FFD700")("   ══════════════════════════════════════════════════════════════════════════════════════"));
	console.log();
	
	// Info bar with gradient effect
	console.log(
		chalk.hex("#FF6B6B")("   [V] Version: ") +
		chalk.bold.hex("#4ECDC4")("1.0.1") +
		chalk.gray("  │  ") +
		chalk.hex("#FF6B6B")("[L] License: ") +
		chalk.bold.hex("#95E1D3")("MIT") +
		chalk.gray("  │  ") +
		chalk.hex("#FF6B6B")("[N] Node: ") +
		chalk.bold.hex("#68D391")("16.0.0+")
	);
	
	console.log(
		chalk.hex("#FF6B6B")("   [A] Author: ") +
		chalk.bold.hex("#A78BFA")("Kasim Kazmi") +
		chalk.gray("  │  ") +
		chalk.hex("#FF6B6B")("[G] GitHub: ") +
		chalk.bold.hex("#60A5FA")("github.com/kasimkazmi/create-ignite")
	);
	
	console.log();
	console.log(chalk.bold.hex("#FF6B6B")("   * ") + chalk.bold.white("Let's ignite your next project and build something amazing!") + chalk.bold.hex("#FF6B6B")(" *"));
	console.log();
	console.log(chalk.bold.hex("#FFD700")("   ══════════════════════════════════════════════════════════════════════════════════════"));
	console.log();
}

export function displayFrameworkBanner(framework) {
	const banners = {
		react: {
			icon: "[R]",
			name: "React",
			version: "18.x",
			description: "A JavaScript library for building user interfaces",
			color: "#61DAFB",
			gradient: ["#61DAFB", "#4FC3F7"]
		},
		vue: {
			icon: "[V]",
			name: "Vue",
			version: "3.x",
			description: "The Progressive JavaScript Framework",
			color: "#42B883",
			gradient: ["#42B883", "#35495E"]
		},
		nextjs: {
			icon: "[N]",
			name: "Next.js",
			version: "15.x",
			description: "The React Framework for the Web",
			color: "#FFFFFF",
			gradient: ["#FFFFFF", "#000000"]
		},
		nuxt: {
			icon: "[N]",
			name: "Nuxt",
			version: "3.x",
			description: "The Intuitive Vue Framework",
			color: "#00DC82",
			gradient: ["#00DC82", "#00BD6F"]
		},
		express: {
			icon: "[E]",
			name: "Express",
			version: "4.x",
			description: "Fast, unopinionated, minimalist web framework",
			color: "#000000",
			gradient: ["#FFFFFF", "#CCCCCC"]
		},
		fastify: {
			icon: "[F]",
			name: "Fastify",
			version: "5.x",
			description: "Fast and low overhead web framework",
			color: "#FFFFFF",
			gradient: ["#FFFFFF", "#000000"]
		},
	};

	const banner = banners[framework];
	
	if (banner) {
		console.log();
		console.log(
			"      " +
			banner.icon + "  " +
			chalk.bold.hex(banner.gradient[0])(banner.name) +
			" " +
			chalk.hex(banner.gradient[1])(banner.version) +
			chalk.gray(" - ") +
			chalk.italic.gray(banner.description)
		);
		console.log();
	}
}

// Optional: Add a success banner for when project is created
export function displaySuccessBanner(projectName, framework) {
	console.log();
	console.log(chalk.bold.green("   ═══════════════════════════════════════════════════════════════════════════════════"));
	console.log();
	console.log(
		chalk.bold.white("      *  Success! Your project ") +
		chalk.bold.cyan(`"${projectName}"`) +
		chalk.bold.white(" is ready!")
	);
	console.log();
	console.log(chalk.bold.green("   ═══════════════════════════════════════════════════════════════════════════════════"));
	console.log();
	console.log(chalk.bold.white("   [F] Get started with:"));
	console.log();
	console.log(chalk.bold.cyan(`      cd ${projectName}`));
	console.log(chalk.bold.cyan("      npm install"));
	console.log(chalk.bold.cyan("      npm run dev"));
	console.log();
	console.log(chalk.bold.hex("#FFD700")("   * Happy coding! *"));
	console.log();
}