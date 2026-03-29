#!/usr/bin/env node

import { spawnSync } from "child_process";

function printUsage(): void {
  console.log(`Usage: signal-tracker <command> [options]

Commands:
  track    --address <WALLET_ADDRESS> --chain <chain>
             Track wallet address signals via onchainos
  signals  --chain <chain>
             Fetch buy signals for a chain via onchainos
  price    --address <TOKEN_ADDRESS> --chain <chain>
             Fetch token price via onchainos

Examples:
  signal-tracker track --address 0xABC... --chain ethereum
  signal-tracker signals --chain solana
  signal-tracker price --address 0xDEF... --chain bsc
`);
}

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      const key = args[i].slice(2);
      result[key] = args[i + 1];
      i++;
    }
  }
  return result;
}

function runCommand(cmd: string, args: string[]): void {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.error) {
    console.error(`Failed to run '${cmd}': ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== null && result.status !== 0) {
    process.exit(result.status);
  }
}

function main(): void {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || argv[0] === "--help" || argv[0] === "-h") {
    printUsage();
    process.exit(0);
  }

  const subcommand = argv[0];
  const rest = argv.slice(1);
  const flags = parseArgs(rest);

  switch (subcommand) {
    case "track": {
      const address = flags["address"];
      const chain = flags["chain"];
      if (!address || !chain) {
        console.error(
          "Error: 'track' requires --address <WALLET_ADDRESS> and --chain <chain>"
        );
        process.exit(1);
      }
      runCommand("onchainos", [
        "signal",
        "address-tracker",
        "--address",
        address,
        "--chain",
        chain,
      ]);
      break;
    }

    case "signals": {
      const chain = flags["chain"];
      if (!chain) {
        console.error("Error: 'signals' requires --chain <chain>");
        process.exit(1);
      }
      runCommand("onchainos", ["signal", "buy-signals", "--chain", chain]);
      break;
    }

    case "price": {
      const address = flags["address"];
      const chain = flags["chain"];
      if (!address || !chain) {
        console.error(
          "Error: 'price' requires --address <TOKEN_ADDRESS> and --chain <chain>"
        );
        process.exit(1);
      }
      runCommand("onchainos", [
        "market",
        "price",
        "--address",
        address,
        "--chain",
        chain,
      ]);
      break;
    }

    default:
      console.error(`Unknown command: '${subcommand}'`);
      printUsage();
      process.exit(1);
  }
}

main();
