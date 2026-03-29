# signal-tracker CLI Reference

## signal-tracker Binary

### Commands

```
signal-tracker track   --address <WALLET> [--chain <CHAIN>]
signal-tracker signals                    [--chain <CHAIN>]
signal-tracker price   --address <TOKEN>  [--chain <CHAIN>]
```

Supported `--chain` values: `ethereum`, `solana`, `base`, `bsc` (default: `ethereum`)

---

## Underlying onchainos Commands

### Smart money address tracking

```bash
onchainos signal address-tracker --address <WALLET> --chain <CHAIN>
```

### Aggregated buy signals

```bash
onchainos signal buy-signals --chain <CHAIN>
```

### Token price

```bash
onchainos market price --address <TOKEN> --chain <CHAIN>
```

### Swap quote

```bash
onchainos swap quote --from <TOKEN_A> --to <TOKEN_B> --amount <AMOUNT> --chain <CHAIN>
```

### Execute swap

```bash
onchainos swap swap --from <TOKEN_A> --to <TOKEN_B> --amount <AMOUNT> --chain <CHAIN>
```
