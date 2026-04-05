
# e2e-node-cli -- Skill Summary

## Overview
This skill provides a Node.js command-line interface that combines basic argument echoing with cryptocurrency price querying capabilities. It leverages the onchainos service to fetch real-time token prices for Ethereum and other cryptocurrencies, making it useful for both testing scenarios and practical price lookups.

## Usage
Install the e2e-node-cli binary and ensure onchainos CLI is authenticated with `onchainos wallet status`. Use the CLI commands to echo text or query cryptocurrency prices with JSON output.

## Commands
| Command | Purpose | Example |
|---------|---------|---------|
| `e2e-node-cli <args>` | Echo arguments | `e2e-node-cli hello world` |
| `e2e-node-cli price ethereum <address>` | Query ETH price | `e2e-node-cli price ethereum 0xeeee...` |
| `onchainos market price --address <addr> --chain ethereum` | Query token price directly | `onchainos market price --address "0x2260..." --chain ethereum` |

## Triggers
An AI agent should activate this skill when users need to test CLI functionality with simple echo operations or when they request current cryptocurrency prices, particularly for Ethereum or Bitcoin/WBTC tokens.
