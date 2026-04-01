---
name: uniswap-swap-integration
description: "Integrate Uniswap swaps into applications via Trading API, Universal Router SDK, or direct smart contract calls"
version: "1.3.0"
author: "Uniswap Labs"
tags:
  - uniswap
  - swap
  - defi
  - trading-api
---

# Uniswap Swap Integration

Integrate Uniswap swaps into frontends, backends, and smart contracts.

## Overview

This skill guides AI agents through integrating Uniswap token swaps using three methods: Trading API (recommended for most use cases), Universal Router SDK (full routing control), and direct smart contract calls (on-chain composability).

## Pre-flight Checks

1. Node.js and npm/yarn installed
2. An Ethereum RPC endpoint configured
3. For Trading API: a Uniswap API key from [developer.uniswap.org](https://developer.uniswap.org)

## Quick Decision Guide

| Building...                    | Use This Method               |
| ------------------------------ | ----------------------------- |
| Frontend with React/Next.js    | Trading API                   |
| Backend script or bot          | Trading API                   |
| Smart contract integration     | Universal Router direct calls |
| Need full control over routing | Universal Router SDK          |

## Commands

### Trading API (Recommended)

Base URL: `https://trade-api.gateway.uniswap.org/v1`

3-step flow:

1. **Check Approval**: `POST /check_approval` to verify token allowance
2. **Get Quote**: `POST /quote` to get swap route and pricing
3. **Execute Swap**: `POST /swap` to get the transaction calldata

### Universal Router SDK

For full control, use `@uniswap/universal-router-sdk` and `@uniswap/v3-sdk`.

## Full Skill

For the complete integration guide with code examples, Permit2 patterns, L2 WETH handling, ERC-4337 support, and troubleshooting, install the full plugin:

```
npx skills add Uniswap/uniswap-ai
```

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| "INSUFFICIENT_FUNDS" | Not enough tokens for swap | Check balance before submitting |
| "SLIPPAGE_TOO_HIGH" | Market moved beyond tolerance | Increase slippage or retry |
| 403 from Trading API | Missing or invalid API key | Get key from developer.uniswap.org |

## Skill Routing

- For swap planning with deep links (no code) -> use `uniswap-swap-planner`
- For viem/wagmi blockchain setup -> use `uniswap-viem-integration`
- For paying API invoices with any token -> use `uniswap-pay-with-any-token`
