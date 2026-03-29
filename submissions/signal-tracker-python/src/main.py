#!/usr/bin/env python3
"""signal-tracker CLI - wraps onchainos commands for signal tracking."""

import argparse
import subprocess
import sys


def cmd_track(args):
    command = [
        "onchainos", "signal", "address-tracker",
        "--address", args.address,
        "--chain", args.chain,
    ]
    result = subprocess.run(command, check=False)
    sys.exit(result.returncode)


def cmd_signals(args):
    command = [
        "onchainos", "signal", "buy-signals",
        "--chain", args.chain,
    ]
    result = subprocess.run(command, check=False)
    sys.exit(result.returncode)


def cmd_price(args):
    command = [
        "onchainos", "market", "price",
        "--address", args.address,
        "--chain", args.chain,
    ]
    result = subprocess.run(command, check=False)
    sys.exit(result.returncode)


def main():
    parser = argparse.ArgumentParser(
        prog="signal-tracker",
        description="CLI tool for tracking on-chain signals via onchainos",
    )
    subparsers = parser.add_subparsers(dest="subcommand", metavar="SUBCOMMAND")
    subparsers.required = True

    # track subcommand
    track_parser = subparsers.add_parser(
        "track",
        help="Track a wallet address on a given chain",
    )
    track_parser.add_argument(
        "--address",
        required=True,
        metavar="WALLET_ADDRESS",
        help="Wallet address to track",
    )
    track_parser.add_argument(
        "--chain",
        required=True,
        metavar="CHAIN",
        help="Blockchain network (e.g. eth, bsc, sol)",
    )
    track_parser.set_defaults(func=cmd_track)

    # signals subcommand
    signals_parser = subparsers.add_parser(
        "signals",
        help="Fetch buy signals for a given chain",
    )
    signals_parser.add_argument(
        "--chain",
        required=True,
        metavar="CHAIN",
        help="Blockchain network (e.g. eth, bsc, sol)",
    )
    signals_parser.set_defaults(func=cmd_signals)

    # price subcommand
    price_parser = subparsers.add_parser(
        "price",
        help="Get the price of a token on a given chain",
    )
    price_parser.add_argument(
        "--address",
        required=True,
        metavar="TOKEN_ADDRESS",
        help="Token contract address",
    )
    price_parser.add_argument(
        "--chain",
        required=True,
        metavar="CHAIN",
        help="Blockchain network (e.g. eth, bsc, sol)",
    )
    price_parser.set_defaults(func=cmd_price)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
