---
slug: 2026-09-13-incident-refunds
title: How refunds from the 4 September incident will work
authors: [security-council]
tags: [Announcement]
---

On 4 September 2026, a fault in an upstream price feed caused the oracle Vesu relies on to report roughly half of true market value for several assets. In the 109 seconds that followed, 47 borrowing positions across seven pools were liquidated at prices that were never real.

**Asset recovery is now complete.** The Vesu Security Council, together with the Starknet Security Council, pool curators and partners, was able to recover 95% of the value lost at current prices — 93% measured at prices on the morning of 4 September.

This post explains how refunding to affected users works.

**Refunds are organised and executed by the curator of each pool.** Vesu is a decentralised lending protocol, and pools are deployed and curated by different entities. The recovered funds are held by the respective pool curators — Vesu, Re7 Labs and Clearstar — and refunds are organised through them.

What follows is the suggested refunding scheme — the approach we have worked out with the curators and recommend. Each curator decides how to refund the users of the pools it runs, so the details may differ from pool to pool. If you want to know exactly how your pool is handling it, your curator is the right place to ask. To get in touch with your curator, open a ticket in the Vesu Discord.

## What was recovered

The table below gives a breakdown of what has been recovered and how the 95% recovery rate is derived. These figures are based on prices as of 11 September; at prices on the morning of the incident the numbers look slightly different.

| | |
|---|---|
| Recovered, at spot | $1,330,278.93 |
| Distributable after swap cost | $1,324,085.08 |
| Lender claims (bad debt) | $657,386.80 |
| Borrower claims | $737,913.96 |
| Total claims | $1,395,300.76 |
| Recovery factor | 95% |

The gap between the first two lines is the cost of converting assets. The recovered basket does not match what each pool needs to refund, so some balances were swapped back during the recovery.

These are the assets that were recovered:

| Asset | Recovered | Price | Value |
|---|---|---|---|
| wstETH | 294.21459300 | $3,077.60 | $905,473.78 |
| WBTC | 2.63180048 | $76,916.98 | $202,430.14 |
| strkBTC | 1.28594519 | $76,905.38 | $98,896.10 |
| xstrkBTC | 0.77940700 | $77,465.88 | $60,377.45 |
| xWBTC | 0.51902543 | $79,014.85 | $41,010.72 |
| USDC | 19,910.98830700 | $0.9999 | $19,908.08 |
| STRK | 77,000.00000000 | $0.0283 | $2,182.66 |
| **Total** | | | **$1,330,278.93** |

## One rate for everyone

Every affected user is refunded at the same recovery rate, whether you were a lender whose deposits absorbed bad debt or a borrower whose collateral was liquidated.

That sounds obvious, but it takes care to get right. Lenders lost tokens out of a shared reserve. Borrowers lost collateral and had debt cancelled in exchange, so their loss is the difference between the two. Those are different kinds of loss, and the only way to treat them equally is to value both on the same basis and apply one factor.

> Users are refunded 95% of your loss, measured at current prices. Measured against prices on the morning of 4 September, that same payout is 93%.

The gap between the two is not a second haircut — it is the market. Asset prices moved between 4 September and today, so the same loss and the same recovery are valued differently on the two dates.

## Three groups

### 1. Lenders who are still in the pool — nothing to do

If you supplied an asset to an affected market and you still hold that position, you do not need to do anything.

Your pool took a write-down when the bad debt was booked, which reduced what each share is worth. Recovered assets are donated back into the reserve of the affected market, and the value of your shares rises accordingly. There is no claim to file, no transaction to sign, and nothing to withdraw or re-deposit. Depending on your pool, this may already have happened.

### 2. Lenders who have since withdrawn — contact your curator

If you were in an affected market when the bad debt was booked and you have since withdrawn, topping up the reserve does not reach you. You no longer hold shares in it.

You are still entitled to a refund, based on the share of the bad debt you absorbed, and it comes as a direct refund from your pool's curator. We reconstructed every deposit and withdrawal in the affected markets since the incident, netted them per account, and identified everyone who bore part of the loss and then left.

Please contact the curator of your pool by opening a ticket in the Vesu Discord.

### 3. Borrowers who were liquidated — contact your curator

If your position was liquidated during that window, you receive a direct refund in the asset that was taken from you, the collateral asset of your borrow position, from your pool's curator.

Your loss is the collateral liquidated less the debt that was cleared in exchange. The liquidation itself is not reversed — it cannot be — but that difference is refunded at 95%.

Please contact the curator of your pool by opening a ticket in the Vesu Discord.

## On the liquidators

The liquidators who ran these transactions did nothing wrong. They operated bots that responded correctly to the prices the protocol was fed by the Pragma oracle at the time.

While liquidations on the Vesu protocol are public and liquidators unkown, most liquidators could be identified and contacted, onchain or by other means. The liquidators that could be contacted engaged constructively and returned what they had received, less their cost or reward, voluntarily. 

The recovery effort was successful because of these liquidators — thank you.

## BTCfi rewards

Separately from the refund above, borrowers whose positions were closed by these liquidations could not earn btcFi rewards while the position no longer existed.

Those rewards are being compensated too, for the period the position was shut. This is not part of the 95% and is not funded from the recovered assets — it is a separate payment, claimable with regular BTCfi rewards. No separate action is needed from you.

## A note of caution

Refunds go to the on-chain addresses that held the positions. Please **ignore anyone who contacts you asking you to "claim" a refund, connect a wallet, or sign a message**. Neither Vesu nor any curator will ever ask you to do any of those things.

---

A full technical write-up of the incident and its root cause is published separately. If you have questions about your own position, open a ticket in the Vesu Discord and we will walk through the numbers with you.
