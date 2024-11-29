---
id: risk-report-template
title: Risk Report Template
sidebar_label: Risk Template
sidebar_position: 5
slug: /curators/risk-template
---

## Metadata

Include the following variables with the information compiled for the respective market in the header of the risk report:

```
export const pool_Id = '0x39b...'
export const asset = '0x6d8...'
export const rating = 'medium'
export const pool_risk = 'low'
export const asset_risk = 'low'
export const oracle_risk = 'low'
export const market_risk = 'medium'
export const collateral_risk = 'low'
```


## Summary

Provide a brief overview of the market covered, key findings, and links to key resources (asset homepage, stats, documentation, etc.).


## Pool Risk

Provide all relevant information that is used to assess the lending pool risk. In particular, discuss the following items:

- Smart contract risk
- Counterparty risk

Derive the appropriate pool risk rating using the following guidelines:

- ⬜ Neutral: Uses a factory extension and has no counterparty risk (achieved by pool immutability)
- 🟩 Low: Uses a factory extension or comparable (in terms of fail-safes, audits, and transparency), low counterparty risk (achieved e.g. through a decentralized governance process)
- 🟨 Medium: Uses an audited "experimental" extension with both source code and audit report publicly available, medium counterparty risk (e.g. due to a centralized governance process)
- 🟥 High: Else


## Asset Risk

Provide all relevant information that is used to assess the asset risk. In particular, discuss the following items:

- Smart contract risk
- Counterparty risk
- Depeg risk

Derive the appropriate asset risk rating using the following guidelines:

- ⬜ Neutral: Native asset or comparable (e.g. WETH is comparable to ETH for the purpose of this report)
- 🟩 Low: "Blue-chip" asset or comparable (in terms of smart contract, counterparty and depeg risk) 
- 🟨 Medium: Other assets with an audited, standard token implementation (e.g. ERC-20, ERC-4626) and both source code and audit report publicly available. Medium counterparty risk 
- 🟥 High: Else


## Oracle Risk

Provide all relevant information that is used to assess the oracle risk. In particular, discuss the following items:

- Smart contract risk
- Price composition
- Price timeliness
- Oracle fail-safes

Derive the appropriate oracle risk rating using the following guidelines:

- ⬜ Neutral: No oracle used
- 🟩 Low: Median (or another robust aggregation technique) of at least two price sources including one off-chain source. Fail-safes for staleness and other failure sources (if any) in place. Audited implementation.
- 🟨 Medium: TWAP (or another robust aggregation technique) of a single price source or insufficient fail-safes. Audited implementation.
- 🟥 High: Else


## Market Risk

Use the [Standard Market Risk Model](https://docs.google.com/spreadsheets/d/1zU9IRKCX8xicSNd4UV78hMEw_rf-ZtGL/edit?usp=sharing&ouid=108086377410680948516&rtpof=true&sd=true), or an advanced model, to assess an asset's _Market Risk_.

Note that each enabled collateral asset is accompanied with dedicated risk parameters resulting in a lending pair specific _Market Risk_. According to the _Standard Market Risk Model_, the asset's overall risk is then estimated using the _Max_-aggregator function.

If an advanced model is used, explain the model including its assumptions and calibration technique or reference an appropriate resource that discusses this model.


## Collateral Risk

Outline the asset's full collateral chain (i.e. the graph of all collateral asset/debt asset relationships that include the asset in question in a path).

The collateral (chain) risk rating then is simply the worst rating found across all connected (directly or indirectly) collateral assets.