use clap::{Parser, Subcommand};
use std::process::Command;

#[derive(Parser)]
#[command(name = "signal-tracker")]
#[command(about = "A CLI tool for tracking on-chain signals via onchainos")]
#[command(version)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Track signals for a wallet address on a given chain
    Track {
        /// Wallet address to track
        #[arg(long)]
        address: String,

        /// Chain to query (e.g. eth, bsc, solana)
        #[arg(long)]
        chain: String,
    },

    /// Fetch buy signals for a given chain
    Signals {
        /// Chain to query (e.g. eth, bsc, solana)
        #[arg(long)]
        chain: String,
    },

    /// Get the price of a token by address on a given chain
    Price {
        /// Token contract address
        #[arg(long)]
        address: String,

        /// Chain to query (e.g. eth, bsc, solana)
        #[arg(long)]
        chain: String,
    },
}

fn run_onchainos(args: &[&str]) {
    let status = Command::new("onchainos")
        .args(args)
        .status()
        .unwrap_or_else(|e| {
            eprintln!("Failed to execute onchainos: {}", e);
            std::process::exit(1);
        });

    if !status.success() {
        std::process::exit(status.code().unwrap_or(1));
    }
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Track { address, chain } => {
            run_onchainos(&[
                "signal",
                "address-tracker",
                "--address",
                address,
                "--chain",
                chain,
            ]);
        }
        Commands::Signals { chain } => {
            run_onchainos(&["signal", "buy-signals", "--chain", chain]);
        }
        Commands::Price { address, chain } => {
            run_onchainos(&[
                "market",
                "price",
                "--address",
                address,
                "--chain",
                chain,
            ]);
        }
    }
}
