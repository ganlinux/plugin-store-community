# signal-tracker CLI Reference

## signal-tracker Binary

源码仓库：`ganlinux/signal-tracker`（Rust）

### 子命令

```
signal-tracker track   --address <WALLET> [--chain <CHAIN>]
signal-tracker signals                    [--chain <CHAIN>]
signal-tracker price   --address <TOKEN>  [--chain <CHAIN>]
```

支持的 `--chain` 值：`ethereum`、`solana`、`base`、`bsc`（默认 `ethereum`）

---

## 底层 onchainos 命令

### 聪明钱追踪

```bash
onchainos signal address-tracker --address <WALLET> --chain <CHAIN>
```

### 聚合买入信号

```bash
onchainos signal buy-signals --chain <CHAIN>
```

### 代币价格

```bash
onchainos market price --address <TOKEN> --chain <CHAIN>
```

### Swap 报价

```bash
onchainos swap quote --from <TOKEN_A> --to <TOKEN_B> --amount <AMOUNT> --chain <CHAIN>
```

### 执行 Swap

```bash
onchainos swap swap --from <TOKEN_A> --to <TOKEN_B> --amount <AMOUNT> --chain <CHAIN>
```
