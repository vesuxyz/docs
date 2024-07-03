---
id: create-pool
title: How to create a new lending pool
sidebar_label: Create Pool
sidebar_position: 6
slug: /dev-guides/create-pool
---

In this section, we'll learn how to create new VESU markets.

Creating VESU markets can't be done from the VESU website, as we currently do not support this feature (coming soon).

Having established that, we are going to look at how you can create a market by calling the VESU core smart contracts.

1. Head to the deployed VESU contract on Starkscan/Voyager, connect your wallet and call the `create_pool` method.

2. Pass in the required arguments:
- `asset_params`: Which is an array of the asset parameters
- `max_position_ltv_params`: Which is an array of the loan-to-value parameters
- `extension`: Which is the address of the deployed extension you'll like to use for the pool

3. On creation, you should get returned your new pool ID.

### Enabling new markets on the Vesu UI

For users' protection and security, we tend to ensure that all markets listed on the UI are intensely vetted and considered safe. 

Safe to add that this does not go against the permissionlessness of Vesu, as you can create as much markets as you like and even develop your own UI for them, but the gatekeeping of the official UI is done to ensure markets risk ratings are safe for users to interact with.

To get started, with the process of listing your new market on the Vesu UI:
1. Head to the official documentation repository, and submit a pull request with a risk report added to the risk report section.

2. The team will go through and review your pull request.

3. If considered safe and PR merged, the proper process to enable the new market on the Vesu UI will begin shortly afterwards.