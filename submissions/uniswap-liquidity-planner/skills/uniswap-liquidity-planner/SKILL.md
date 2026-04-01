---
name: uniswap-liquidity-planner
description: "Plan and generate deep links for creating liquidity positions on Uniswap v2, v3, and v4"
version: "0.2.0"
author: "Uniswap Labs"
tags:
  - uniswap
  - liquidity
  - lp-position
---

# Uniswap Liquidity Planner

Plan and generate deep links for creating liquidity positions on Uniswap v2, v3, and v4.

## Overview

This skill helps AI agents plan concentrated liquidity positions by guiding through pool selection, fee tier choices, price range strategies, and generating Uniswap web interface deep links to create the position.

## Pre-flight Checks

1. Know the token pair for the liquidity position
2. Know the target chain
3. Understand concentrated liquidity concepts (price ranges, fee tiers)
4. A web browser to open the generated deep links

## Commands

### Plan a Liquidity Position

1. Identify the token pair and chain
2. Select the pool version (v2 full-range, v3/v4 concentrated)
3. Choose fee tier (1bp, 5bp, 30bp, 100bp)
4. Define price range (narrow for higher fees, wide for less impermanent loss)
5. Generate the deep link: `https://app.uniswap.org/add/<token0>/<token1>/<fee>?chain=<chain>`

### Pool Version Guide

| Version | Range Type | Best For |
|---------|-----------|----------|
| v2 | Full range | Simple, passive LPing |
| v3 | Concentrated | Active management, higher capital efficiency |
| v4 | Concentrated + hooks | Advanced strategies with custom logic |

## Full Skill

For the complete planning logic with all deep link parameters and range strategies:

```
npx skills add Uniswap/uniswap-ai
```

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| Pool not found | No pool exists for this pair/fee | Try a different fee tier or check token addresses |
| Invalid range | Min price >= max price | Ensure min < max and both are positive |

## Skill Routing

- For token swaps instead of liquidity -> use `uniswap-swap-planner`
- For viem/wagmi blockchain setup -> use `uniswap-viem-integration`
