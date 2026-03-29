---
name: signal-tracker
description: "Track smart money wallet activity and aggregated buy signals"
version: "1.0.0"
author: "Mingtao"
tags:
  - smart-money
  - signals
  - wallet-tracker
---

# signal-tracker

## Overview

signal-tracker lets the AI Agent track smart money wallet trades and fetch aggregated buy signals.
All on-chain data queries are delegated to the `onchainos` CLI.

> All on-chain operations (signing, broadcast, swap, contract calls) MUST go through onchainos CLI.

## Pre-flight Checks

Before using this skill:

1. `onchainos` CLI is installed and authenticated
2. `signal-tracker` binary is installed via `plugin-store install signal-tracker`
3. Network connectivity is available

## Commands

### Track a smart money wallet

```bash
signal-tracker track --address <WALLET_ADDRESS> --chain ethereum
```

**When to use**: The user provides a wallet address and wants to see its recent DEX trades.
**Output**: Recent buy/sell records including token, amount, and timestamp.

Delegates to:
```bash
onchainos signal address-tracker --address <WALLET_ADDRESS> --chain ethereum
```

---

### Get aggregated buy signals

```bash
signal-tracker signals --chain ethereum
```

**When to use**: The user wants to know which tokens smart money / KOLs are collectively buying.
**Output**: Token list sorted by buy count, with token address and participating wallet count.

Delegates to:
```bash
onchainos signal buy-signals --chain ethereum
```

---

### Query token price

```bash
signal-tracker price --address <TOKEN_ADDRESS> --chain ethereum
```

**When to use**: The user wants to check the current price of a token seen in the signals.
**Output**: Token price (USD), 24h change, volume.

Delegates to:
```bash
onchainos market price --address <TOKEN_ADDRESS> --chain ethereum
```

---

### Execute Swap

If the user wants to buy a token after seeing a signal, **follow these steps strictly**:

**Step 1 — Get a quote**

```bash
onchainos swap quote --from USDC --to <TOKEN_ADDRESS> --amount 100 --chain ethereum
```

**Step 2 — Show quote and request confirmation**

Show the user the quote details (expected output amount, slippage, fees), then ask the user to confirm.

**MUST ask the user to confirm before proceeding. Do NOT execute the swap unless the user explicitly confirms. If the user does not confirm, abort the operation.**

**Step 3 — Only after user confirms, execute the swap**

```bash
onchainos swap swap --from USDC --to <TOKEN_ADDRESS> --amount 100 --chain ethereum
```

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| `Failed to run onchainos` | onchainos not installed or not in PATH | Run `onchainos --version` to verify |
| `address-tracker: not found` | onchainos version too old | Upgrade onchainos |
| `Chain not supported` | Invalid chain argument | Supported chains: ethereum, solana, base, bsc |
| `Rate limited` | Too many requests | Wait 10 seconds and retry |

## Skill Routing

- Execute swap -> use `okx-dex-swap` skill
- Check wallet balance -> use `okx-wallet-portfolio` skill
- Token security scan -> use `okx-security` skill
- Meme token analysis -> use `okx-dex-trenches` skill
