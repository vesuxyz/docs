---
id: share-inflation-protection-disclosure
title: 2024-12-03 Share Inflation Protection Disclosure
sidebar_label: 2024-12-03 Share Inflation
sidebar_position: 2
slug: /security/disclosures-report/share-inflation-protection-disclosure
---

Exploitable _Inflation Fee_ reset in the Singleton contract.

### Summary

Vesu's Singleton contract implements an "Inflation Fee" with the goal to mitigate the risk of an attack strategy known as the _Compound donation_ vulnerability which was [exploited](https://www.halborn.com/blog/post/explained-the-sonne-finance-hack-may-2024) on various lending protocols. 

A bug report on Immunefi reveals a vulnerability in this implementation resulting in a possible exploit through a sophisticated attack strategy.

Users were not affected by this since the vulnerability only exists if new assets are added to an existing lending pool.

Vesu has implemented a fix which mitigates this vulnerability for future lending pools.

### Background

Vesu runs a bug bounty program on Immunefi offering a total bounty of $100,000.

The vulnerability disclosed here has been reported by a whitehat through our Immunefi program recently.

Vesu has acknowledged the finding with a "Critical" classification due to the potential pool shares inflation "attack" which was mitigated with a fix explained below. 

Vesu has compensated the whitehat with a payout according to the terms of the bug bounty program.

### Details of vulnerability

Vesu LPs are allocated _pool shares_ tracking their claim on a market's liquidity. 

When a new asset is added to an existing pool, an attacker can potentially inflate these shares making it possible to steal user funds. This vulerability is know as the _Compound donation attack_ and has been exploitet on various lending markets including [Sonne Finance](https://www.halborn.com/blog/post/explained-the-sonne-finance-hack-may-2024).

Vesu's Singleton contract thus applies an [`INFLATION_FEE_SHARES`](https://github.com/vesuxyz/vesu-v1/blob/54ba4ad665d31b0b0b6d206d6493157a81201150/src/singleton.cairo#L610) to the first depositor in a new market. This `INFLATION_FEE_SHARES` effectively makes the attack unfeasible. 

Further, an `INFLATION_FEE_SHARES` reset mechanism is implemented with the goal to not accumulate "dust" balances in pools.

It turns out, that this `INFLATION_FEE_SHARES` reset mechanism opens up the possibility to execute a sophisticated pool share inflation attack potentially impacting users' funds.

This attack is very similar to the original share inflation attack that the `INFLATION_FEE_SHARES` mechanism aimed at preventing, yet it involves additional steps.

:::info
It is important to note that the attack is only possible if new assets are added to an existing pool, thus only affects governed Vesu pools.
:::

### Details of fix

Key to executing the sophisticated pool shares inflation attack is to trigger a reset of the `INFLATION_FEE_SHARES` as explained above.

The fix thus centers on "deactivating" the `INFLATION_FEE_SHARES` reset mechanism.

This can be achieved in multiple ways. The implemented fix thus forces to ["burn"](https://github.com/vesuxyz/vesu-v1/blob/54ba4ad665d31b0b0b6d206d6493157a81201150/src/extension/default_extension_po.cairo#L630) a sufficiently large amount of shares with the creation of new markets. 
The amount of burned pool shares is slightly larger than the `INFLATION_FEE_SHARES` thus making it impossible for the pool shares balance to fall below the `INFLATION_FEE_SHARES` and trigger a reset. 

:::info
Due to the forced burning of the `INFLATION_FEE_SHARES`, to create new markets users now have to hold the respective assets in their account.
:::

:::warning
This fix is implemented in the extension contracts and thus only applies to pools created through "official" extensions.
:::

### Timeline of events

2024-12-03: Disclosure made by the Vesu team

### Links

- Vesu's bug bounty [program](https://immunefi.com/bug-bounty/vesu/information/)
- Fix audit [report](https://github.com/Cairo-Security-Clan/Audit-Portfolio/blob/main/Vesu_Extensions_Audit_Report.pdf)