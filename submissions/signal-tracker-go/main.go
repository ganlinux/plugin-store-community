package main

import (
	"fmt"
	"os"
	"os/exec"
)

const usage = `signal-tracker - A CLI for tracking on-chain signals

Usage:
  signal-tracker <command> [flags]

Commands:
  track    Track wallet address signals
  signals  Fetch buy signals for a chain
  price    Fetch token price

Run 'signal-tracker <command> --help' for command-specific help.
`

const trackUsage = `Usage:
  signal-tracker track --address <WALLET_ADDRESS> --chain <chain>

Flags:
  --address   Wallet address to track (required)
  --chain     Chain name (required)
  --help      Show this help message
`

const signalsUsage = `Usage:
  signal-tracker signals --chain <chain>

Flags:
  --chain     Chain name (required)
  --help      Show this help message
`

const priceUsage = `Usage:
  signal-tracker price --address <TOKEN_ADDRESS> --chain <chain>

Flags:
  --address   Token address (required)
  --chain     Chain name (required)
  --help      Show this help message
`

func runCommand(name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin
	return cmd.Run()
}

func parseFlags(args []string, keys ...string) map[string]string {
	result := make(map[string]string, len(keys))
	for i := 0; i < len(args); i++ {
		for _, key := range keys {
			flag := "--" + key
			if args[i] == flag && i+1 < len(args) {
				result[key] = args[i+1]
				i++
				break
			}
		}
	}
	return result
}

func hasFlag(args []string, flag string) bool {
	for _, a := range args {
		if a == flag {
			return true
		}
	}
	return false
}

func cmdTrack(args []string) {
	if hasFlag(args, "--help") || hasFlag(args, "-h") {
		fmt.Print(trackUsage)
		return
	}

	flags := parseFlags(args, "address", "chain")

	if flags["address"] == "" {
		fmt.Fprintln(os.Stderr, "error: --address is required")
		fmt.Fprint(os.Stderr, trackUsage)
		os.Exit(1)
	}
	if flags["chain"] == "" {
		fmt.Fprintln(os.Stderr, "error: --chain is required")
		fmt.Fprint(os.Stderr, trackUsage)
		os.Exit(1)
	}

	err := runCommand("onchainos", "signal", "address-tracker",
		"--address", flags["address"],
		"--chain", flags["chain"],
	)
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			os.Exit(exitErr.ExitCode())
		}
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func cmdSignals(args []string) {
	if hasFlag(args, "--help") || hasFlag(args, "-h") {
		fmt.Print(signalsUsage)
		return
	}

	flags := parseFlags(args, "chain")

	if flags["chain"] == "" {
		fmt.Fprintln(os.Stderr, "error: --chain is required")
		fmt.Fprint(os.Stderr, signalsUsage)
		os.Exit(1)
	}

	err := runCommand("onchainos", "signal", "buy-signals",
		"--chain", flags["chain"],
	)
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			os.Exit(exitErr.ExitCode())
		}
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func cmdPrice(args []string) {
	if hasFlag(args, "--help") || hasFlag(args, "-h") {
		fmt.Print(priceUsage)
		return
	}

	flags := parseFlags(args, "address", "chain")

	if flags["address"] == "" {
		fmt.Fprintln(os.Stderr, "error: --address is required")
		fmt.Fprint(os.Stderr, priceUsage)
		os.Exit(1)
	}
	if flags["chain"] == "" {
		fmt.Fprintln(os.Stderr, "error: --chain is required")
		fmt.Fprint(os.Stderr, priceUsage)
		os.Exit(1)
	}

	err := runCommand("onchainos", "market", "price",
		"--address", flags["address"],
		"--chain", flags["chain"],
	)
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			os.Exit(exitErr.ExitCode())
		}
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func main() {
	args := os.Args[1:]

	if len(args) == 0 || args[0] == "--help" || args[0] == "-h" {
		fmt.Print(usage)
		return
	}

	subCmd := args[0]
	subArgs := args[1:]

	switch subCmd {
	case "track":
		cmdTrack(subArgs)
	case "signals":
		cmdSignals(subArgs)
	case "price":
		cmdPrice(subArgs)
	default:
		fmt.Fprintf(os.Stderr, "error: unknown command %q\n\n", subCmd)
		fmt.Fprint(os.Stderr, usage)
		os.Exit(1)
	}
}
