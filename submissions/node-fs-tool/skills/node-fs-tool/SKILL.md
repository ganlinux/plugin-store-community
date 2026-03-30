---
name: node-fs-tool
description: "Text echo CLI built in Node.js"
version: "1.0.0"
author: "yz06276"
tags:
  - node
  - text-processing
---

# Node FS Tool

## Overview

This skill provides a text echo CLI built in Node.js, distributed via npm.

## Pre-flight Checks

1. Node.js and npm must be installed
2. The `node-echo-cli` package is installed (via `plugin-store install node-fs-tool`)

## Binary Tool Commands

### Echo a message

```bash
node-echo-cli echo "Hello World"
```

**When to use**: When the user wants to echo text through the Node.js tool.
**Output**: `Echo from Node.js: Hello World`

### Show version

```bash
node-echo-cli version
```

**When to use**: When the user wants to check the tool version.
**Output**: `node-echo-cli 1.0.0`

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| "Unknown command" | Invalid command | Use `echo` or `version` |
| Command not found | Package not installed | Run `plugin-store install node-fs-tool` |
