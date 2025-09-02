
# Welcome to Vesu

Vesu V2 is a fully open and permissionless lending protocol built on [Starknet](https://starknet.io).

Anyone can supply assets to earn yield, borrow against collateral, or create new lending markets.

Vesu is designed as an open infrastructure: transparent, accessible, and free to use by anyone. 

Vesu V2 builds on the same battle-tested concepts than the initial version of the Vesu lending protocol, that was launched in July 2024, but further optimizes for simplicity and security by:

- Isolating pools (and respective funds) into separate `Pool` instances
- Removing hooks and extensions
- Simplifying pool state and logic into a single `Pool` contract
- Externalizing `VToken` into stand-alone ERC-4626 vaults