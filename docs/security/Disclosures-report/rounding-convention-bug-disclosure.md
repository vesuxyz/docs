---
id: rounding-convention-bug-disclosure
title: 2025-06-04 Rounding Convention Bug Disclosure
sidebar_label: 2025-06-04 Rounding Convention
sidebar_position: 2
slug: /security/disclosures-report/rounding-convention-bug-disclosure
---

Exploitable rounding convention bug in the Singleton contract.

### Summary:

This report outlines the discovery, reporting, and resolution of a critical vulnerability in the Vesu lending protocol. The vulnerability was identified by a whitehat hacker through Vesu’s Immunefi bug bounty program and was successfully addressed in collaboration with the whitehat hacker, ChainSecurity, Argent’s security team and the lending pool curators.

### 1. Vulnerability Details

**Vulnerability Type:**

- Rounding convention

**Affected Component:**

- Liquidation with activated `receive_as_shares` flag in `Singleton::liquidate_position`

**Impact:**

- Through a sophisticated attack, involving a malicious pool extension contract, a new lending pool created by the attacker and flashloans, the vulnerability could have been exploited and user funds could have been stolen.

### 2. Discovery and Reporting

- The vulnerability was reported on May 23, 2025 through Vesu’s Immunefi bug bounty program.
- The Vesu team reviewed the finding and started to engage with the whitehat on the Immunefi platform within hours.
- For security reasons, the vulnerability was only disclosed publicly after the Vesu protocol was migrated and funds secured.

### 3. Collaboration and Coordination

**Parties Involved:**

- Immunefi: Facilitated the initial report and communication.
- Argent Labs: Provided technical expertise, security analysis and observed the migration process.
- ChainSecurity: Provided technical expertise, security analysis and observed the migration process.
- Lending Pool Curators: Enabled the migration contracts to secure user funds.

**Timeline of Events:**

| Date | Description |
| --- | --- |
| May 23, 2025 at 3:54 am | Vulnerability reported to Immunefi. |
| May 23, 2025 at 7:19 am | Immunefi Escalated report to Vesu team. |
| May 23, 2025 at 10:48 am | Vesu team involved Argent’s security team to assist with technical assessment. |
| May 23, 2025 at 2:28 pm | Vesu & Argent team completed initial analysis and started to engage with whitehat on Immunefi. |
| May 23, 2025 at 2:44 pm | ChainSecurity engaged for technical assessment and assistance with remediation plan. |
| May 24, 2025 at EOD | Remediation plan developed and reviewed in collaboration with ChainSecurity. |
| May 27, 2025 at EOD | Fix and Vesu migration contracts and script implemented and tested.
Lending pool curators notified. |
| May 28, 2025 at 1:00 pm | Migration initiated in collaboration with ChainSecurity and lending pool curators. |
| May 28, 2025 at 10:30 pm | Migration of Vesu contracts, lending pools, backend and frontend completed and verified. |
| May 28, 2025 at 10:40 pm | Public disclosure and announcement of migration on Vesu blog and X. |

### 4. Remediation

**Steps Taken to Fix the Vulnerability:**

- The fix included removing the logic affected by the wrong rounding convention. Specifically, the ability to liquidate an insolvent position by being paid in collateral shares instead of underlying collateral assets, or the ability to use the `receive_as_shares` flag, was removed. This component is not strictly necessary, and has never been used before, for the Vesu protocol to safely liquidate insolvent positions.
- In order to prevent similar vulnerabilities in the future, the fix also included whitelisting pool extension contracts, from which new pools can be created. This removes an important attack surface for the Vesu protocol while still enabling fully permisionless pool creation.
- Furthermore, in order to prevent from funds being frozen in the migration contracts or the V2 Vesu contracts due to a failed migration, the Vesu V2 contracts, both `SingletonV2` and `DefaultExtensionPOV2` were made upgradeable. The ownership of this new feature currently resides with a 3/5 multisig account, of which 2 are external signers, that will be expanded to an appropriate *Security Council* setup.

**Testing and Verification:**

- The fix, as well as the migration contracts and integrity of the migrated protocol state, has been extensively tested prior to the migration using both unit tests and integration tests.
- ChainSecurity and Argent’s security teams conducted limited best-effort checks of the migration contracts, fixed Vesu contracts and the migration script prior to the migration.

### 5. Conclusion

**Lessons Learned:**

- On a technical level, an exploit of this vulnerability was only possible because Vesu enabled new lending pools to make use of any third party lending hook implementations, through the respective lending pool extension contract. This feature, while having been extensively audited prior to the launch of Vesu, has proven to open a large attack surface. To reduce this surface, the implemented fix now requires new extension contracts to be whitelisted.
- This incident has shown, once again, how important an ongoing security process is. Our ability to handle this situation, in collaboration with our partners, with the best outcome possible for Vesu users serves both as confirmation and reminder that security requires constant investment and committment.

**Acknowledgments:**

- We would like to extend our sincere gratitude and recognition to the whitehat hacker, who responsibly disclosed this critical vulnerability through our bug bounty [program](https://immunefi.com/bug-bounty/vesu/information/)
- Furthermore, this migration was only possible through the close collaboration with our partners Immunefi, Argent, ChainSecurity, and lending pool curators Re7 Labs, Braavos and Alterscope.

### 6. References

- Initial [disclosure](https://x.com/vesuxyz/status/1927827405030244838)
- Vesu Security [docs](https://docs.vesu.xyz/security/security-basics)
- Further inquiries: [Telegram](https://t.me/VesuChat), [Discord](https://discord.gg/G9Gxgujj8T), [security@vesu.xyz](mailto:security@vesu.xyz)