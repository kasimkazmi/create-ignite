#!/usr/bin/env node

/**
 * Prepare script - runs after npm install
 * Makes bin/index.js executable
 */

import { chmod } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prepare() {
	try {
		const binPath = path.join(__dirname, '..', 'bin', 'index.js');
		await chmod(binPath, 0o755);
		console.log('✔ Made bin/index.js executable');
	} catch (error) {
		console.warn('⚠️  Could not make bin/index.js executable:', error.message);
	}
}

prepare();

