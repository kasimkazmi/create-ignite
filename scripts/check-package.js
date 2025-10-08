#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkPackage(packageName) {
  try {
    const { stdout } = await execAsync(`npm view ${packageName} --json`);
    const info = JSON.parse(stdout);
    console.log(`✅ Package "${packageName}" exists:`);
    console.log(`   Version: ${info.version}`);
    console.log(`   Author: ${info.author?.name || 'Unknown'}`);
    console.log(`   Latest: ${info['dist-tags']?.latest || info.version}`);
    return true;
  } catch (error) {
    if (error.code === 'E404') {
      console.log(`❌ Package "${packageName}" does NOT exist - available to publish!`);
      return false;
    } else {
      console.error(`Error checking package: ${error.message}`);
      return false;
    }
  }
}

// Check packages
const packages = [
  'create-ignite',
  '@kasimkazmi/create-ignite',
  'my-awesome-cli',
  '@kasimkazmi/my-cli'
];

console.log('🔍 Checking package availability on NPM...\n');

for (const pkg of packages) {
  await checkPackage(pkg);
  console.log('');
}
