---
id: risk-framework
title: Vesu Risk Framework
sidebar_label: Risk Framework
sidebar_position: 1
slug: /risk/risk-framework
---

## Introduction

Vesu is a fully permissionless [lending protocol](../explore/whitepaper.md) built on Starknet that allows anyone to lend, borrow and create new lending markets. The permissionless nature of Vesu enables markets to autonomously coordinate around liquidity distribution instead of a central risk manager to intermediate between participants. At the same time, this “free markets” approach puts risk management in the hands of users. Users are empowered to define their own risk management strategy and whether to implement an effective strategy themselves or delegating it to a sophisticated risk manager. Having full transparency on the risks Vesu lending markets expose users to is thus imperative for participants to make informed decisions. 

In this document we outline the methodology, the Vesu Risk Framework, used to assess and communicate the risks users are exposed to when depositing assets in a market. A market therefore is defined as a lending pool containing the specific asset. On the other hand, the methodology **does not cover** other risks such as the a borrower’s liquidation risk.

The methodology outlined here is informed by industry best practices and, in particular, by the [OWASP Risk Rating Methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology). It will benefit lenders and borrowers in assessing markets and identifying those that best match their risk profile. Developers may use the framework to make informed decisions when creating new markets or building new extensions.


## Methodology

The methodology builds on the widely used risk concept that suggests that

***Risk** equals **Likelihood** x **Impact***

It focuses on a single **Impact** metric which is the *loss of user funds.* Other known cyber threats generally include loss of user data or privacy breaches. However, in the context of DeFi applications these threats are less relevant. Risk assessment is thus simplified to the estimation of a risk event’s likelihood. We propose the risk methodology shown in the following diagram.

![Vesu Risk Framework](./images/vesu-risk-framework.png)

This methodology builds on a continuous risk process resulting in **a)** identification of relevant risk events, **b)** risk rating, **c)** communication of risks, and **d)** mitigation measures. The latter can be implemented on the Vesu app level or the users themselves and may change over time. 


### Risk Identification

This involves compiling a list of external or internal risk events that relate to a certain lending market. A risk event can be due to various factors including technical risks, market risks or counterparty risks. We consider the following risk categories.

#### Pool Risk

This concerns any risk associated with the pool into which an asset is deposited. These risks are as follows;

- **Smart contract risk**: Flaws in the design or implementation of the pool logic and its extension respectively
- **Counterparty risk**: Risks due to the existence of central control vectors in the pool implementation and the governance processes around these

#### Asset Risk

This covers risks related to the asset itself that is deposited in a pool. The following risks are covered in this category;

- **Smart contract risk**: Flaws in the design or implementation of the token logic and its dependencies respectively
- **Depeg risk**: The risk of a depeg event of the asset. Applies only to pegged assets such as stablecoins or LSTs
- **Counterparty risk**: Risks due to the existence of central control vectors in the token implementation, or its dependencies, and the governance processes around these

#### Oracle Risk

This relates to the accuracy and reliability of the oracle price feed for an asset and the possibility of price manipulations. Factors that add to the reliability (or lack thereof) of an oracle price feed for an asset include

- **Smart contract risk**: Flaws in the design or implementation of the token logic and its dependencies respectively
- **Price composition methodology**: the methodology used to source and aggregate market prices into an oracle price. In general, more sources and source diversity increases reliability and accuracy. Aggregation across these sources is done along two dimensions: across different price sources (e.g. Chainlink) and/or different price points from a single source (e.g. Uniswap TWAP).
- **Price timeliness**: Latency in price updates may significantly affect an oracle price’s accuracy (and robustness).
- **Oracle fail-safes**: The implementation of fail-safes, or circuit breakers, can play a critical role in preventing losses accrued in a market due to an oracle failure.

#### Market Risk

This pertains to the risk of adverse market events affecting the solvency of users’ positions and resulting in a liquidation shortfall. Such a shortfall, often referred to as a bad debt event, incurs a loss for the lenders of the respective asset. The most common factors driving market risk are as follows;

- market (spot) liquidity of an asset
- relative price volatility of the collateral and debt asset pair
- risk parameters such as the maximal loan-to-value ratio

Based on these factors the likelihood of a bad debt event can then be computed using the [Standard Market Risk Model](https://docs.google.com/spreadsheets/d/1zU9IRKCX8xicSNd4UV78hMEw_rf-ZtGL/edit?usp=sharing&ouid=108086377410680948516&rtpof=true&sd=true).

#### Collateral Risk

This accounts for the fact that risks may spread from one asset to another through a chain of collateralized positions, or a collateral chain respectively. While the asset in question may be “safe”, it inherits the risks of its collateral assets. As an example, if the deposited asset is e.g. Ether and does not expose a counterparty risk, a lending pool configuration may allow for the borrowing of Ether by depositing a highly centralized stablecoin carrying the counterparty risk of its issuer. Supplying Ether in the pool thus exposes the depositor to the counterparty risk of the centralized stablecoin. 

An asset's collateral chain can be described as a directed graph establishing all `collateral_asset -> debt_asset` relationships where the asset in question is part of a path. These paths may include a direct relationship among the asset and a collateral asset or this relationship may span across a number of "edges". Thus, an asset may also inherit the risk of another asset that is not enabled as collateral directly but as collateral to borrow one of the asset's collateral assets. It is thus important to understand a pool configuration and the full collateral chains it creates.


### Risk Rating

This concerns the allocation of a risk rating to each of the identified risk events and markets. The risk rating relies on the estimation of a *likelihood* for the risk event to occur.

**Likelihood**

The likelihood expresses, in a non-probabilistic way, how likely a risk event is to occur. For some risk events we are able to formally express this likelihood as a statistical probability of occurence in a given time period. However, in most cases we lack the data basis for a statistical inference and have to resort to a qualitative approach.

The risk rating is expressed in terms of a common likelihood scale shown in the following table.

| Likelihood | Description                                           |
|------------|-------------------------------------------------------|
| ⬜ Neutral | Risk event not applicable                             |
| 🟩 Low     | Risk event is unlikely to occur                       |
| 🟨 Medium  | Risk event is unexpected but possible to occur        |
| 🟥 High    | Risk event is expected or unable to assess likelihood |

For a market the likelihood of the identified risk events is then estimated according to a heuristic that is based on certain risk factors. This heuristic is explained in more detail in the [Risk Report Instructions](./risk-reports/risk-report-instructions.md).

**Risk Scorecard**

The *Risk Scorecard* provides a structured way of representing and communicating the multi-dimensional risk profile of a lending market. The following table shows a sample risk scorecard based on hypothetical data.

| Market         | Pool Risk | Asset Risk | Oracle Risk | Market Risk | Collateral Risk |
| -------------- | --------- | ---------- | ----------- | ----------- | --------------- |
| Asset A→Pool 0 | Low       | Low        | Low         | Medium      | Neutral         |
| Asset B→Pool 0 | Low       | Low        | Medium      | Medium      | Neutral         |
| Asset A→Pool 1 | Medium    | Low        | Medium      | Low         | Low             |

The Risk Scorecard can thus serve lenders, borrowers and pool developers alike to understand the sources of risk associated with a lending market and make informed decisions.

**Risk Aggregation**

For some use cases it is helpful to have a compact, one-dimensional risk rating that reflects the lending market’s aggregate risk. We therefore introduce a comprehensive risk rating that is derived by aggregating across the various risk events. The aggregation method has a significant impact on the market’s resulting rating suggesting to use a conservative method. We thus propose to compute the comprehensive rating for a market as the highest likelihood across all risk events.

As a result, the comprehensive risk rating reflects the likelihood of the risk event that is most likely to occur. If this event’s likelihood is *High,* then the market’s comprehensive risk is also *High*.

### Risk Declaration

The risk scorecards and comprehensive ratings are maintained in a public risk database such that everyone is able to access and verify those ratings. This database is further used to inform risk declarations in the Vesu frontend and other Vesu media. 

### Risk Mitigation

The risk mitigation strategy for Vesu is based on the risk database and is implemented on the level of *protocol*, *frontend* and *user* as shown in the following table.

| Level    | Owner                | Mitigation Strategy |
| -------- | -------------------- | ------------------- |
| Protocol | Lending pool creator | configure a lending pool and its extension with a risk profile that matches the risk capacity of the target user |
| Frontend | Frontend provider    | 1) restrict access to lending pools with a risk rating of Low or Medium, 2) transparently declare pool risk ratings for users to make informed investment decisions |
| Users    | User                 | Make informed investment decision based on a pool’s risk rating and their own risk capacity  |

## Discussion

Vesu is a permissionless lending protocol allowing users to freely lend, borrow and create new lending pools. Through permissionless pool creation, Vesu enables the market to coordinate around liquidity allocation and empowers users to define their risk management strategy. This, however, requires that users have the necessary risk transparency to make informed decisions. The Risk Framework introduced here offers a risk assessment methodology that builds on general risk best practices. The core of this approach forms a risk rating that allows us to assess and communicate the risk profile of a supplied asset. Based on this risk rating we propose a multi-tier risk mitigation strategy that empowers users while acknowledging Vesu’s role in fostering secure and healthy markets.