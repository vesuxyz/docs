---
id: curators
title: Explore Curators
sidebar_label: Curators
sidebar_position: 3
---

Vesu does not rely on centralized governance but on an open curation model. Professional, third-party __Curators__ create and manage lending pools as market demand arises. This keeps the system efficient and avoids delays that governance-based protocols often face.

![Vesu Curators](./images/vesu-curators.png)

The diagram above shows a simplified market structure with three Vesu lending pools. The curators of these pools are independent parties with full responsibility for the initial setup and ongoing management of their pools.  
Most curators are experienced teams with a strong track record across lending protocols and DeFi ecosystems.

The diagram above shows a simplified market structure with three Vesu lending pools. Each pool is created and managed by an independent curator, responsible for its setup and ongoing configuration.  
While many pools are run by experienced teams with a strong track record, Vesu is open for anyone to launch a pool. Always do your own research and choose pools that match your risk tolerance.

## Role of curators

Curators are responsible for keeping their pools running safely and efficiently. This includes, but is not limited to, the following activities:

- Creation and initial setup of new lending pools
- Monitoring of Vesu market conditions
- Monitoring of external market conditions, e.g. liquidity on DEXs required for efficient liquidations
- Adjusting pool risk parameters when market conditions change

## Outside the scope of curator responsibilities

This open curator model empowers open, efficient and secure lending markets. At the same time, the role & responsibilities of curators very limited with the goal to minimize the trust assumptions towards these third parties. Curators are not involved in the following:

- Custody of user funds  
- Control over user funds in Vesu pools
- Valuation of assets & liabilities, or user positions on Vesu
- Executing liquidations  

In the case of Vaults, curators can define an **on-chain mandate** that governs how funds are allocated. These rules are transparent and enforced by smart contracts.

## Curator fees

Curators may charge a fee, taken as a percentage of the interest generated in a pool.  
This fee is set by the curator and displayed transparently on the Vesu frontend.