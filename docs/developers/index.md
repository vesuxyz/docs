
# Welcome to the Vesu V2 Developer Documentation

The Vesu V2 lending protocol is the next iteration of the Vesu lending protocol, Starknet's most trusted lending market. The Vesu V2 protocol builds on the same concepts than the V1 protocol but makes a number of different design decisions in order to maximize simplicity and security. The main features of Vesu V2 are:

- Isolation of pools (and respective funds) into separate `Pool` instances
- Removal of hooks and extensions, simplification of pool state and logic into a single `Pool` contract
- Externalizing `VToken` into stand-alone ERC-4626 vaults
- Simplification of various components and features 

If you are a developer building on Vesu, a technical expert doing due dilligence or an interested user, your journey to master the Vesu codebase starts here!

- [Getting Started](/docs/developers/getting-started.md): Ready to jump right in? Find all infos to start coding here.
- [Core](/docs/developers/core/architecture.md): Explore the Vesu V2 architecture and core building blocks.
- [Interact](/docs/developers/interact/deposit-withdraw.md): Learn about how to create, manage, and liquidate positions.
- [Liquidation Bot](/docs/developers/liquidation-bot.md): Master the liquidation bot and start making your own bucks liquidating insolvent positions on Vesu.
- [Migrate to V2](/docs/developers/migrate-v1-to-v2.md): Find additional information on the migration of Vesu V1 positions to V2.
- [Vesu V1](/docs/developers/vesu-v1/index.md): Curious about Vesu V1? Find the docs to our first version here.
