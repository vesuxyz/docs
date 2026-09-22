---
id: oracle-price-feed-incident-disclosure
title: 2026-09-22 Oracle Price Feed Incident Disclosure
sidebar_label: 2026-09-22 Oracle Price Feed Incident
sidebar_position: 5
slug: /security/disclosures-report/oracle-price-feed-incident-disclosure
---

Incorrect prices published by the Pragma oracle caused 47 liquidations across seven Vesu pools on 4 September 2026.

### Summary

On 4 September 2026, between 04:07:52 and approximately 04:40 UTC, Pragma published incorrect prices for several Starknet price feeds. For a period of roughly 109 seconds, a number of major assets — BTC, WBTC, ETH, STRK, USDC and, on a lagging cadence, wstETH — were reported to Vesu at approximately half their true market value.

Vesu pools consumed those prices, as they are designed to. Positions that were healthy at real market prices appeared insolvent at the reported prices, and were liquidated by permissionless liquidation bots. The reconstruction identifies **47 liquidations, affecting 42 borrower wallets across seven pools**, between 04:08:16 and 04:10:04 UTC.

The root cause lies entirely upstream of Vesu, in Pragma's publishing pipeline. There was no vulnerability in the Vesu contracts: the protocol's liquidation arithmetic, accounting and bad debt handling all behaved exactly as specified. What failed was an external input, in a way that the price validation Vesu performs onchain could not detect — because the metadata Vesu validates against was itself incorrect.

Reconstructed impact, valued at prices as of 11 September:

| Measure | Estimated value |
| --- | --- |
| Liquidated positions | 47 |
| Borrower wallets | 42 |
| Affected pools | 7 |
| Borrower equity lost | $737,914 |
| Bad debt absorbed by pools | $657,387 |
| Liquidator proceeds above debt repaid | $1,395,301 |

Asset recovery has since been completed at a rate of 95% measured at 11 September prices, or 93% measured at prices on the morning of the incident, and refunds are being processed by the pool curators. See the separate [refund guide](/blog/2026-09-13-incident-refunds) for more details around asset recovery; this report covers the technical cause and the protocol's response to it.

### 1. How Vesu consumes prices

Every Vesu pool reads asset prices through an `Oracle` adapter contract, which sits between the pool and the third-party oracle provider. The adapter does not merely forward prices. For each listed asset it holds an `OracleConfig` and validates every price it fetches against it:

- **minimum number of price sources** — the aggregate must be computed from at least `number_of_sources` independent source observations;
- **freshness** — the price must not be older than `timeout` seconds;
- **non-zero price**.

The adapter returns an `AssetPrice { value, is_valid }` to the pool. If `is_valid` is false, the pool does not transact on that price; the affected market halts rather than acting on data it cannot trust.

When a price passes validation, the pool uses it to value both sides of a borrow position on every interaction:

```
LTV = (debt_amount × debt_price) / (collateral_amount × collateral_price)
```

A position becomes liquidatable when this ratio exceeds the liquidation LTV configured by the pool curator for that collateral/debt pair. Liquidation on Vesu is permissionless and can be full or partial: a liquidator repays some or all of a position's debt and receives collateral in exchange, priced at the oracle price less a fixed *liquidation discount* set by the curator.


### 2. What happened upstream

Pragma published incorrect prices as the result of a misconfiguration in its publisher software combined with a series of coincidences. A token mapping in the publisher's asset registry pointed at a stale conversion route, which produced one badly wrong USDT/USD observation. At the same moment, a freshness filter removed three healthy observations, leaving that faulty value and one good one — and the median of two values is their average. The resulting USDT/USD aggregate of **$2.036576** was then read back by the publisher software and used as the conversion factor for other feeds, so that USDT-quoted venue prices for BTC, WBTC, ETH, STRK and USDC were divided by roughly 2.04 and appeared to have lost about half their value. Both active publishers ran the same software, so publisher redundancy did not produce independent results.

We do not restate Pragma's analysis in further detail here. Their full post-mortem, including timeline, root cause and remediation tracker, is published at [pragma.build/updates/vesu-incident](https://www.pragma.build/updates/vesu-incident).


### 3. Why Vesu positions were liquidated

The pools did exactly what the reported prices instructed them to do.

Consider a typical affected position: 1 wstETH of collateral against 2,100 USDC of debt, in a market with a liquidation LTV of 80%.

- **At true prices** (wstETH at $3,000): collateral value $3,000, debt value $2,100, LTV 70%. The position is healthy and not liquidatable.
- **At reported prices** (wstETH at $1,500): collateral value $1,500, debt value $2,100, LTV 140%. The position is not merely liquidatable — it is reported as insolvent, with debt exceeding the value of all its collateral.

Liquidation bots then did precisely what they are built to do. They observed positions that the protocol itself reported as insolvent, and liquidated them. Forty-seven liquidations executed in 109 seconds. The liquidators were not exploiting anything; they were reacting, correctly and automatically, to the prices published by the Pragma oracle.


### 4. Why lenders incurred bad debt

Bad debt arises when a liquidation cannot recover a position's full debt even after all of its collateral is sold. The shortfall is socialised across the market's lenders in the same transaction: written off against the reserve, proportionally reducing every supply share.

That socialisation is a deliberate safeguard. Were the loss not recognised at once, it would fall on whoever withdrew last, turning every bad debt event into a race to the exit. Recognising it immediately and pro rata is the fair outcome: every lender bears the same proportional cost regardless of when they act.

Continuing the example: 1 wstETH valued at $1,500 lets a liquidator repay **$1,428** of the $2,100 debt at a 5% discount. The remaining **$672** is written off against the market's USDC reserve, and the borrower loses their entire $900 of equity — together, exactly the $1,572 the liquidator gained above what they repaid. The identity holds across the incident as a whole ($737,914 + $657,387 = $1,395,301).

The cause was not market risk or a loose parameter, but collateral sold at half its worth: valued correctly, these positions were not liquidatable at all.

### 5. What worked: Vesu's price validation rejected the broken root feed

Vesu does not consume oracle prices blindly, and this materially limited the damage.

The broken root feed in this incident was the **USDT/USD aggregate of $2.036576** — a stablecoin reported at more than twice its peg. That price never reached a Vesu position. Vesu's oracle configuration for the USDT feed requires a minimum of **4 independent source observations**; the faulty aggregate was computed from only **2**. The adapter marked the price invalid, and the markets that depend on it halted rather than transacting on it.

That rule did its job under precisely the conditions it was designed for. Every Vesu market with USDT as collateral or as debt was shielded from a 100%+ pricing error, and none of them were liquidated on it. The freshness and non-zero checks were likewise active throughout.

These advanced validation rules — minimum source count, staleness bounds, and an explicit validity flag that halts a market rather than guessing — go beyond what most lending protocol oracle integrations perform, and on 4 September they prevented a substantially worse outcome than the one that occurred.

### 6. Why that did not protect every market

The feeds that caused the damage were not the USDT feed. They were the volatile-asset feeds — BTC, WBTC, ETH, STRK, wstETH — and those passed validation.

The reason is a subtle one, and it is the central lesson of this incident. Those feeds were constructed by the publisher in two legs:

```
asset/USD  =  asset/USDT (venue observations)  ÷  USDT/USD (Pragma's own onchain median)
```

The source count published by Pragma with such a feed reflected the **observations of the first leg only** — the many venue prices for the asset against USDT. It did not account for the second leg, the conversion factor, which was the very same two-source USDT/USD aggregate that Vesu's own rules had just rejected.

Stated plainly: **Pragma's metadata that Vesu validates against was broken**. Vesu's existing oracle sanity checks would have caught the flawed prices if the published metadata were correct.

### 7. Immediate measures

**Upstream (Pragma).** Pragma has removed the conversion feedback path, so publishers no longer reuse the oracle's own onchain USDT/USD median when constructing other feeds. It has also deployed monitoring for publisher outages, stale feeds, insufficient source counts, invalid prices and stablecoin depegs; corrected the monitoring calculations themselves, including overflow normalisation and independent reference lookups; restored deviation metrics after chain reorganisations; and published an explorer exposing publisher coverage, update frequency and price history per source. The authoritative and current status of this work is Pragma's [remediation tracker](https://www.pragma.build/updates/vesu-incident).

**Vesu.** The Vesu Security Council, together with the Starknet Security Council, pool curators, StarkWare and the Starknet Foundation, immediately began tracing the liquidations and contacting the liquidators involved. Asset recovery concluded on September 11 with a 95% recovery rate at September 11 prices, 93% at prices on the morning of the incident. Details are in the [refund guide](/blog/2026-09-13-incident-refunds).

### 8. Long-term measures

**Upstream (Pragma).** Reference-price normalisation and strict 4 source quorums for USDT and USDC (normalizing) feeds have been released and are in rollout verification across publishers, all five publishers are submitting again with discrepancy review ongoing. Work on carrying accurate source counts through composed prices, so that a weak conversion leg can no longer hide behind strong first-leg observations, is ongoing. Finally, smart contract administration is being moved to a 3-of-5 multisig. The authoritative and current status of this work is Pragma's [remediation tracker](https://www.pragma.build/updates/vesu-incident).

**Vesu.** The team reviews the feasibility of cross-oracle deviation checks as an additional oracle sanity check. However, this depends on the (permanent) availability of multiple oracle providers on Starknet.


### 9. Timeline of events

All times UTC.

| Date | Description |
| --- | --- |
| 4 Sep 2026, 04:07:52 | Pragma's USDT/USD aggregate becomes incorrect; median of two observations returns $2.036576. |
| 4 Sep 2026, 04:08:14 | The incorrect conversion factor spreads to other feeds. BTC, WBTC, ETH, STRK and USDC are reported at roughly half their true value. |
| 4 Sep 2026, 04:08:16 – 04:10:04 | 47 liquidations execute across seven Vesu pools, affecting 42 borrower wallets. |
| 4 Sep 2026, ~04:40 | Reported medians normalise. Derived feeds such as wstETH recover on their own cadence. |
| 4 Sep 2026, 07:59 | Pragma deploys SDK 2.13.1, removing the conversion feedback path. |
| 4–13 Sep 2026 | Vesu Security Council, Starknet Security Council, curators and partners reconstruct the liquidations and contact liquidators. |
| 13 Sep 2026 | Vesu announces completion of asset recovery and publishes the recommended refund approach. |
| 13 Sep 2026 | Pragma deploys monitoring corrections. |
| 14 Sep 2026 | Pragma publishes its incident post-mortem. |

### 10. Conclusion

**Lessons learned:**

- A lending protocol's valuation is only ever as good as the data it is given, and validation performed onchain can only check what the provider reports about that data. When the reported metadata does not describe the real composition of a feed, threshold rules on that metadata are blind.
- Vesu's existing validation rules are not theoretical. They rejected the broken root price feed in this incident and protected every USDT market from a 100%+ error. They would have prevented 100% of losses if Pragma's metadata would have been correct. They deserve to be strengthened, not replaced.
- Recovery was possible because curators, security councils and ecosystem partners coordinated instantly, and because liquidators chose to engage and return funds voluntarily. Effective security standards go beyond audits and include processes, readiness and relationships for post-incident recovery efforts.

**Acknowledgments:**

Our thanks go to the liquidators who voluntarily returned funds; to the Starknet Security Council and pool curators for their collaboration during this incident; and most importantly to the affected users for their patience and support.
