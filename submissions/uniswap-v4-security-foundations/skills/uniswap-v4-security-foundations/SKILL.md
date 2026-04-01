---
name: uniswap-v4-security-foundations
description: "Security-first guide for building Uniswap v4 hooks"
version: "1.1.0"
author: "Uniswap Labs"
tags:
  - uniswap
  - v4-hooks
  - security
  - solidity
---

# V4 Hook Security Foundations

Security-first guide for building Uniswap v4 hooks. Hook vulnerabilities can drain user funds. Understand these concepts before writing any hook code.

## Overview

Uniswap v4 hooks are external contracts that execute at key points in the pool lifecycle (beforeSwap, afterSwap, beforeAddLiquidity, etc.). A vulnerability in a hook can compromise all funds in the pool. This skill covers the critical security patterns, common vulnerabilities, and audit requirements.

## Pre-flight Checks

1. Foundry (forge/cast) installed for Solidity development
2. Understanding of Uniswap v4 PoolManager architecture
3. Understanding of Solidity security patterns (reentrancy, access control)

## Key Security Patterns

### Access Control

- Only the PoolManager should be able to call hook functions
- Validate `msg.sender == address(poolManager)` in every callback
- Never expose admin functions without proper access control

### Reentrancy Protection

- Hooks are called during pool operations, creating reentrancy risks
- Use the checks-effects-interactions pattern
- Be cautious with external calls within hook callbacks

### State Validation

- Validate all parameters passed to hook callbacks
- Do not trust user-supplied data without verification
- Check return values from external calls

## Full Skill

For the complete security guide with vulnerability taxonomy, audit checklists, and tested patterns:

```
npx skills add Uniswap/uniswap-ai
```

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| Hook callback reverts | Invalid access control or state | Verify msg.sender is PoolManager |
| Unexpected pool state | Hook modified state incorrectly | Review state transitions in hook logic |

## Skill Routing

- For viem/wagmi blockchain setup -> use `uniswap-viem-integration`
- For CCA auction configuration -> use `uniswap-cca-configurator`
