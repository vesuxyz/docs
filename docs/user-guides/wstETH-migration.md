---
id: wstETH-migration-guide
title: How to migrate your wstETH
sidebar_label: Migrate wstETH
sidebar_position: 14
slug: /user-guides/wsteth-migration
---

### Why is Migration Necessary?

The wstETH contract has been updated due to the need for a new bridge contract. This change ensures continued compatibility and security for users interacting with wstETH on Starknet.

### Key Points for Users:
- The old token will be shown as wstETH (legacy).
- Your balance remains the same. The migration only updates the token contract.
- During migration, your entire wstETH (legacy) wallet balance will be converted.
- The new wstETH is the canonical version and will be supported in all major Starknet DeFi protocols.

If you have an existing position using the previous wstETH contract, follow the steps below to migrate smoothly.

## Migrating an Earn Position

If you have supplied wstETH to Earn, the migration is simple. In the [position overview](https://vesu.xyz/positions/earn) you see a "Migrate" button. Simply confirm the transaction, and your new wstETH position will appear as before.

## Migrating a Borrowing Position

In the [position overview](https://vesu.xyz/positions/), you will see a "Migrate" button for affected positions. The entire process consists of one transaction and includes:

- Close your wstETH (legacy) Borrow position.
- Convert all wstETH (legacy) tokens in your wallet to the new wstETH token.

After the conversion, you will be redirected to the Borrow page, where you can re-open your position.


## Migrating a Multiply Position

:::important  
**Migrating requires closing your Multiply position, which involves a swap to repay your debt.** If liquidity is low, this swap could result in **losses due to price impact**. Please check the shown swap details carefully before proceeding.  
:::

In the [position overview](https://vesu.xyz/positions/multiply), you will see a "Migrate" button for affected position. The entire process consists of one transaction and includes:
	1.	Close your Multiply position. 
	2.	Migrate your wstETH. All wstETH (legacy) in your wallet will be converted to the new token.

When you click on "Migrate", you will see the **exact swap amount** for the conversion of your debt. If liquidity is low, the swap is still possible, but you could face **significant losses due to price impact**.

**What if the swap rate is bad?**  
- **Check again later.** Liquidity max improve, reducing the risk of losses.  
- **[Join our Discord](https://discord.gg/EnGxxWSZ) and open a ticket.** We’re here to assist with any questions or concerns. 

After the migration, you can reopen your Multiply position with the updated wstETH.