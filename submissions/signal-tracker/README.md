# signal-tracker

追踪聪明钱钱包交易动态，获取聚合买入信号。

## Installation

```bash
plugin-store install signal-tracker
```

## What it does

- `signal-tracker track --address <WALLET>` — 查看指定钱包的最新 DEX 交易记录
- `signal-tracker signals` — 获取聪明钱聚合买入信号（当前热门代币）
- `signal-tracker price --address <TOKEN>` — 查询代币当前价格

所有链上数据通过 `onchainos` CLI 获取。

## Source

Rust 源码位于 `src/main.rs`，使用 `cargo build --release` 编译。

## License

MIT
