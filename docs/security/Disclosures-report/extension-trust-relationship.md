---
id: extension-trust-disclosure
title: 2024-06-07 Extension Trust Disclosure
sidebar_label: 2024-06-07 Extension Trust
sidebar_position: 1
slug: /security/disclosures-report/extension-trust-disclosure
---

Risks related to the Singleton-Extension trust relationship.

### Summary

Vesu lending hooks allow developers to build custom lending applications on top of the Vesu protocol.

This innovation introduces a trust relationship between the Singleton contract and the Extension contract which implements the lending hooks.

Users MUST NOT interact with an untrusted Vesu lending pool or they risk partial or complete loss of funds.

Note: This disclosure is NOT about a vulnerability in the Vesu codebase but about the risks related to Vesu's lending hooks and Singleton-Extension trust relationship.

### Background

During the security audits, many conversations centered around the risks introduced by the trust relationship between the Singleton and Extension of a certain lending pool.

We here report on these risks and the respective design decisions.

Accordingly, all risks reported here, including those due to malicious Extension implementations, are not considered as vulnerabilities in the Vesu codebase but intended behavior.

### Details of vulnerability

The Vesu protocol consists of two main [components](https://github.com/vesuxyz/protocol?tab=readme-ov-file#overview): the [Singleton](https://github.com/vesuxyz/protocol/blob/dev/src/singleton.cairo) and pool Extensions. The Singleton is responsible for lend/borrow position accounting and strict pool isolation. The [Extension](https://github.com/vesuxyz/protocol/blob/dev/src/extension/default_extension.cairo) implements the lending hooks for a specific pool. Each pool can have its own Extension implementation and thus behave differently.

The Singleton does not ensure "proper" handling of user funds by the Extension beyond enforcing isolation of pools. Thus, bugs in the Extension's logic or malicious Extension logic can result in partial or total loss of a user's funds.

### Details of fix

This is intended behavior, no fix needed.

### Timeline of events

2024-06-07: disclosure made by the Vesu team

### Links

Find more info in the [docs](/explore) and [audit reports](/security/audits)
