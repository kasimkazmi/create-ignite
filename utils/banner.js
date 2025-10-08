/**
 * Banner and welcome message
 */

import chalk from "chalk";
import gradient from "gradient-string";

export function displayBanner() {
	const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🚀  CREATE IGNITE  🚀                                 ║
║                                                           ║
║     Universal Project Scaffolder                         ║
║     React • Vue • Next.js • Express & More               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
	`;

	console.log(gradient.pastel.multiline(banner));
	console.log(
		chalk.gray("  Version: ") +
		chalk.cyan("1.0.0") +
		chalk.gray(" | ") +
		chalk.gray("License: ") +
		chalk.cyan("MIT")
	);
	console.log(
		chalk.gray("  GitHub: ") +
		chalk.blue("https://github.com/yourusername/create-ignite")
	);
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

