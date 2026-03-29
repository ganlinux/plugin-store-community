# signal-tracker (Rust)

Track smart money wallet trades and fetch aggregated buy signals.

## Installation

```bash
plugin-store install signal-tracker-rust
```

## What it does

- `signal-tracker track --address <WALLET>` — view recent DEX trades of a wallet
- `signal-tracker signals` — get aggregated smart money buy signals
- `signal-tracker price --address <TOKEN>` — query current token price

All on-chain data is fetched via the `onchainos` CLI.

## Source

Rust source: `src/main.rs`

Build: `cargo build --release`

## License

MIT
