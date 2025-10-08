/**
 * Banner and welcome message
 */

import chalk from "chalk";

export function displayBanner() {
	const banner = `
    ╭────────────────────────────────────────────────────────╮
    │                                                        │
    │    ╔══════════════════════════════════════════════╗    │
    │    ║                                              ║ 	 │
    │    ║    🚀  CREATE IGNITE  🚀                    ║ 	│
    │    ║                                              ║ 	 │
    │    ║    Universal Project Scaffolder              ║ 	 │
    │    ║    React • Vue • Next.js • Express & More    ║ 	 │
    │    ║                                              ║ 	 │
    │    ╚══════════════════════════════════════════════╝ 	 │
    │                                                        │
    ╰────────────────────────────────────────────────────────╯
	`;

	// Create a more attractive multi-colored banner
	console.log(chalk.bold.blue("╭─────────────────────────────────────────────────────╮"));
	console.log(chalk.bold.blue("│                                                     │"));
	console.log(chalk.bold.cyan("│    ╔══════════════════════════════════════════════╗ │"));
	console.log(chalk.bold.cyan("│    ║                                              ║ │"));
	console.log(chalk.bold.white("│    ║    ") + chalk.bold.yellow("🚀") + chalk.bold.white("  ") + chalk.bold.cyan("CREATE IGNITE") + chalk.bold.white("  ") + chalk.bold.yellow("🚀") + chalk.bold.white("                    ║ │"));
	console.log(chalk.bold.cyan("│    ║                                              ║ │"));
	console.log(chalk.bold.white("│    ║    ") + chalk.bold.green("Universal Project Scaffolder") + chalk.bold.white("             ║ │"));
	console.log(chalk.bold.white("│    ║    ") + chalk.bold.magenta("React • Vue • Next.js • Express & More") + chalk.bold.white("   ║ │"));
	console.log(chalk.bold.cyan("│    ║                                              ║ │"));
	console.log(chalk.bold.cyan("│    ╚══════════════════════════════════════════════╝ │"));
	console.log(chalk.bold.blue("│                                                     │"));
	console.log(chalk.bold.blue("╰─────────────────────────────────────────────────────╯"));
	console.log(chalk.bold.gray("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
	console.log();
	console.log(
		chalk.bold.gray("  📦 Version: ") +
		chalk.bold.cyan("1.0.1") +
		chalk.bold.gray("  │  ") +
		chalk.bold.gray("📄 License: ") +
		chalk.bold.cyan("MIT") +
		chalk.bold.gray("  │  ") +
		chalk.bold.gray("⚡ Node: ") +
		chalk.bold.green("16.0.0+")
	);
	console.log(
		chalk.bold.gray("  🔗 GitHub: ") +
		chalk.bold.blue.underline("https://github.com/kasimkazmi/create-ignite")
	);
	console.log();
	console.log(chalk.bold.yellow("  ✨ Let's create your project! ✨"));
	console.log();
}

export function displayFrameworkBanner(framework) {
	const banners = {
		react: `
    ⚛️  React ${chalk.cyan("18.x")} ${chalk.gray("- A JavaScript library for building user interfaces")}
		`,
		vue: `
    🖖 Vue ${chalk.green("3.x")} ${chalk.gray("- The Progressive JavaScript Framework")}
		`,
		nextjs: `
    ▲  Next.js ${chalk.white("15.x")} ${chalk.gray("- The React Framework for the Web")}
		`,
		nuxt: `
    💚 Nuxt ${chalk.green("3.x")} ${chalk.gray("- The Intuitive Vue Framework")}
		`,
		express: `
    🚂 Express ${chalk.gray("4.x")} ${chalk.gray("- Fast, unopinionated, minimalist web framework")}
		`,
		fastify: `
    ⚡ Fastify ${chalk.gray("5.x")} ${chalk.gray("- Fast and low overhead web framework")}
		`,
	};

	if (banners[framework]) {
		console.log(banners[framework]);
	}
}

