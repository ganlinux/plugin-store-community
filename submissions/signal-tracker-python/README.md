# signal-tracker (Python)

Track smart money wallet trades and fetch aggregated buy signals.

## Installation

```bash
plugin-store install signal-tracker-python
```

## What it does

- `signal-tracker track --address <WALLET>` — view recent DEX trades of a wallet
- `signal-tracker signals` — get aggregated smart money buy signals
- `signal-tracker price --address <TOKEN>` — query current token price

All on-chain data is fetched via the `onchainos` CLI.

## Source

Python source: `src/main.py`

Build: `pip install pyinstaller && pyinstaller --onefile --name signal-tracker src/main.py`

## License

MIT
