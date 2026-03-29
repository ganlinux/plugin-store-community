use clap::{Parser, Subcommand};
use std::process::Command;

#[derive(Parser)]
#[command(name = "signal-tracker", version = "1.0.0", about = "Smart money signal tracker")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Track recent trades from a smart money wallet
    Track {
        #[arg(long, help = "Wallet address to track")]
        address: String,

        #[arg(long, default_value = "ethereum", help = "Chain name")]
        chain: String,
    },
    /// Show aggregated buy signals from smart money wallets
    Signals {
        #[arg(long, default_value = "ethereum", help = "Chain name")]
        chain: String,
    },
    /// Get token price via onchainos
    Price {
        #[arg(long, help = "Token contract address")]
        address: String,

        #[arg(long, default_value = "ethereum", help = "Chain name")]
        chain: String,
    },
}

/// Run an onchainos CLI command and print its output.
/// All on-chain operations MUST go through onchainos.
fn run_onchainos(args: &[&str]) {
    let output = Command::new("onchainos")
        .args(args)
        .output()
        .unwrap_or_else(|e| {
            eprintln!("Failed to run onchainos: {e}");
            std::process::exit(1);
        });

    if !output.stdout.is_empty() {
        print!("{}", String::from_utf8_lossy(&output.stdout));
    }
    if !output.stderr.is_empty() {
        eprint!("{}", String::from_utf8_lossy(&output.stderr));
    }
    if !output.status.success() {
        std::process::exit(output.status.code().unwrap_or(1));
    }
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Track { address, chain } => {
            println!("Tracking smart money wallet: {address} on {chain}");
            run_onchainos(&["signal", "address-tracker", "--address", &address, "--chain", &chain]);
        }
        Commands::Signals { chain } => {
            println!("Fetching aggregated buy signals on {chain}");
            run_onchainos(&["signal", "buy-signals", "--chain", &chain]);
        }
        Commands::Price { address, chain } => {
            println!("Fetching token price: {address} on {chain}");
            run_onchainos(&["market", "price", "--address", &address, "--chain", &chain]);
        }
    }
}
