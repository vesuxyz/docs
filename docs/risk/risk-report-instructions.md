---
id: risk-report-instructions
title: Risk Report Instructions
sidebar_label: Instructions
sidebar_position: 9
slug: /risk/risk-report-instructions
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

Provide a brief overview of the market covered and the key findings in this risk report. 

It may also be helpful to include links to key resources related to the market such as the asset's homepage.


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
- 🟩 Low: Top-tier oracle provider or comparable, audited and time-tested implementation. Uses diversified price sources and appropriate aggregation methodology. Effective oracle fail-safes in place.
- 🟨 Medium: Audited implementation characterized by a single price source, low timeliness or insufficient fail-safes.
- 🟥 High: Else


## Market Risk

Provide all relevant information that is used to assess the oracle risk. In particular, discuss the following items:

- Market (spot) liquidity
- Relative price volatility
- Pool risk parameters

These metrics are required for the asset itself and all enabled collateral assets.

Derive the appropriate oracle risk rating using the following guidelines:

- ⬜ Neutral: No shortfall possible (e.g. due to collateral asset isolation)
- 🟩 Low: shortfall probability `>0.0% AND <=0.5%`
- 🟨 Medium: shortfall probability `>0.5% AND <=20%`
- 🟥 High: else

The shortfall probability can be estimated using the [Standard Market Risk Model](https://docs.google.com/spreadsheets/d/13NE8h8NA-QS95I6Djn3qjs3fTiSEjTeP3eNFiRB2FIM/edit#gid=606009878).

Note that each enabled collateral asset is accompanied with dedicated risk parameters resulting in a lending pair specific shortfall probability. The probability used to derive the risk rating is simply the maximum shortfall probability across all lending pairs. 


## Collateral Risk

Outline the asset's full collateral chain (i.e. the graph of all collateral asset/debt asset relationships that include the asset in question in a path).

The collateral (chain) risk rating then is simply the worst rating found across all connected (directly or indirectly) collateral assets.