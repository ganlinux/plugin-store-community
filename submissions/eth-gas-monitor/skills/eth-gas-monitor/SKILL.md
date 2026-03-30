---
name: eth-gas-monitor
description: "Monitor Ethereum gas prices and estimate transaction costs"
version: "1.0.0"
author: "yz06276"
tags:
  - ethereum
  - gas
  - analytics
---

# ETH Gas Monitor

## Overview

This skill monitors Ethereum gas prices in real-time and helps users estimate transaction costs before executing on-chain operations. It uses onchainos CLI for all gas queries and transaction simulations.

## Pre-flight Checks

Before using this skill, ensure:

1. The `onchainos` CLI is installed and authenticated
2. Network connectivity is available

## Commands

### Get Current Gas Price

```bash
onchainos gateway gas --chain ethereum
```

**When to use**: When the user asks "what's gas right now?" or wants to know current gas costs.
**Output**: Current gas price in Gwei (slow/standard/fast tiers).

### Simulate Transaction Cost

```bash
onchainos gateway simulate --to <CONTRACT_ADDRESS> --data <CALLDATA> --chain ethereum
```

**When to use**: When the user wants to estimate the gas cost of a specific transaction before executing.
**Output**: Estimated gas units, cost in ETH and USD.

### Get ETH Price (for USD conversion)

```bash
onchainos market price --address 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE --chain ethereum
```

**When to use**: When converting gas costs from ETH to USD.
**Output**: Current ETH price in USD.

### Check Wallet Balance

```bash
onchainos portfolio all-balances --address <WALLET_ADDRESS> --chain ethereum
```

**When to use**: When the user wants to check if they have enough ETH to cover gas.
**Output**: ETH balance and total value.

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| "Chain not supported" | Wrong chain parameter | Use `ethereum` for mainnet |
| "Rate limited" | Too many requests | Wait 10 seconds and retry once |
| "Node unavailable" | RPC issues | Retry after a short delay |

## Skill Routing

- For token swaps → use `okx-dex-swap` skill
- For wallet balances → use `okx-wallet-portfolio` skill
- For security scanning → use `okx-security` skill
