---
id: index-risk-framework
title: Vesu Risk Framework
sidebar_label: Risk Framework
sidebar_position: 2
slug: /risk/risk-framework
---

## Introduction

The nature of DeFi lending exposes users to a variety of risks including technological, operational and market risks. The permissionless nature of Vesu lending markets, and their creation, introduces new risks. At the same time, the “free markets” approach implemented in the Vesu protocol puts risk management in the hands of users. Having full transparency on those risks is thus imperative and empowers users to make informed decisions. 

In this document we outline the methodology, the Vesu Risk Framework, used to assess and communicate the risks users are exposed to when depositing assets in a market. A market therefore is defined as a liquidity pool containing the specific asset. On the other hand, the methodology **does not cover** other risks such as the a borrower’s liquidation risk, the risk of non-compliance with certain regulation or cyber threats.

The methodology outlined here is informed by industry best practices and, in particular, by the [OWASP Risk Rating Methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology).

The Vesu Risk Framework will benefit lenders and borrowers in assessing markets and identifying those that best match their risk profile. Developers may use the framework to make informed decisions when creating new markets or building new extensions.

## Methodology

The methodology builds on the widely used risk concept that suggests that

***Risk** equals **Likelihood** x **Impact***

It focuses on a single **Impact** metric which is the *loss of user funds.* Other known cyber threats generally include loss of user data or privacy breaches. However, in the context of DeFi applications these threats are less relevant. Risk assessment is thus simplified to the estimation of a risk event’s likelihood. We propose the risk methodology shown in the following diagram.

![Vesu Risk Framework](./images/vesu-risk-framework.png)

This methodology builds on a continuous risk process resulting in **a)** identification of relevant risk events, **b)** risk rating, **c)** communication of risks, and **d)** mitigation measures. The latter can be implemented on the Vesu app level or the users themselves and may change over time. 

### Risk Identification

This involves compiling a list of external or internal risk events that relate to a certain lending market. A risk event can be due to the design, implementation or configuration of a lending market or the respective asset and includes technical, economic and governance exploits.

A list of all the identified risk events and a detailed discussion thereof can be found in the [Risk Assessment Sheet](??).

Note that this list may be expanded in future versions as new risks are identified.

### Risk Rating

This concerns the allocation of a risk rating to each of the identified risk events and markets. The risk rating relies on the estimation of a *likelihood* for the risk event to occur.

**Likelihood**

The likelihood expresses, in a non-probabilistic way, how likely a risk event is to occur. For some risk events we are able to formally express this likelihood as a statistical probability of occurence in a given time period. However, in most cases we lack the data basis for a statistical inference and have to resort to a qualitative approach.

The risk rating is expressed in terms of a common likelihood scale shown in the following table.

| Likelihood | Description                                           |
|------------|-------------------------------------------------------|
| Neutral ⬜ | Impossible for the risk event to occur                |
| Low 🟩     | Risk event is unlikely to occur                       |
| Medium 🟨  | Risk event is unexpected but possible to occur        |
| High 🟥    | Risk event is expected or unable to assess likelihood |

For a market the likelihood of the identified risk events is then estimated according to a heuristic that is based on certain risk factors. This heuristic is explained in more detail in the [Risk Assessment Sheet](??).

**Risk Scorecard**

The *Risk Scorecard* provides a structured way of representing and communicating the multi-dimensional risk profile of a lending market. The following table shows a sample risk scorecard based on hypothetical data.

| Market         | Pool Risk | Token Risk | Oracle Risk | Shortfall Risk | Governance Risk |
| -------------- | --------- | ---------- | ----------- | -------------- | --------------- |
| Asset A→Pool 0 | Low       | Low        | Low         | Medium         | Neutral         |
| Asset B→Pool 0 | Low       | Low        | Medium      | Medium         | Neutral         |
| Asset A→Pool 1 | Medium    | Low        | Medium      | Low            | Low             |

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
| Frontend | Frontend provider    | 1) restrict access to lending pools with a risk rating of Low or Medium
2) transparently declare pool risk ratings for users to make informed investment decisions |
| Users    | User                 | Make informed investment decision based on a pool’s risk rating and their own risk capacity  |

## Discussion

Vesu is a fully immutable and permissionless lending protocol allowing users to freely lend, borrow and create new lending pools. Just like every lending protocol, users of Vesu are exposed to certain risks. With the Vesu Risk Framework we have introduced a risk assessment methodology that builds on general risk best practices. The core of this approach forms a risk rating that allows us to assess and communicate the risk profile of a supply asset. Based on this risk rating we propose a multi-level risk mitigation strategy with the objective to protect lenders and borrowers from excess risks and allow them to make informed decisions.