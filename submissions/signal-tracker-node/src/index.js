#!/usr/bin/env node

'use strict';

const { spawnSync } = require('child_process');

const args = process.argv.slice(2);

function parseArgs(argList) {
  const result = {};
  for (let i = 0; i < argList.length; i++) {
    if (argList[i].startsWith('--')) {
      const key = argList[i].slice(2);
      const value = argList[i + 1] && !argList[i + 1].startsWith('--') ? argList[i + 1] : true;
      result[key] = value;
      if (value !== true) i++;
    }
  }
  return result;
}

function run(cmd, cmdArgs) {
  const result = spawnSync(cmd, cmdArgs, { stdio: 'inherit' });
  if (result.error) {
    console.error('Failed to execute command:', result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 0);
}

function printUsage() {
  console.log(`
signal-tracker CLI

Usage:
  signal-tracker track --address <WALLET_ADDRESS> --chain <chain>
  signal-tracker signals --chain <chain>
  signal-tracker price --address <TOKEN_ADDRESS> --chain <chain>

Commands:
  track    Track wallet address signals on a given chain
  signals  Get buy signals for a given chain
  price    Get token price for a given address and chain
`);
  process.exit(0);
}

const subcommand = args[0];
const opts = parseArgs(args.slice(1));

if (!subcommand || subcommand === '--help' || subcommand === '-h') {
  printUsage();
}

switch (subcommand) {
  case 'track': {
    const address = opts['address'];
    const chain = opts['chain'];
    if (!address || !chain) {
      console.error('Error: --address and --chain are required for "track" command');
      process.exit(1);
    }
    run('onchainos', ['signal', 'address-tracker', '--address', address, '--chain', chain]);
    break;
  }

  case 'signals': {
    const chain = opts['chain'];
    if (!chain) {
      console.error('Error: --chain is required for "signals" command');
      process.exit(1);
    }
    run('onchainos', ['signal', 'buy-signals', '--chain', chain]);
    break;
  }

  case 'price': {
    const address = opts['address'];
    const chain = opts['chain'];
    if (!address || !chain) {
      console.error('Error: --address and --chain are required for "price" command');
      process.exit(1);
    }
    run('onchainos', ['market', 'price', '--address', address, '--chain', chain]);
    break;
  }

  default:
    console.error(`Unknown command: ${subcommand}`);
    printUsage();
}
