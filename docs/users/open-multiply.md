---
id: open-multiply
title: How to open a multiply position
sidebar_label: Open Multiply
sidebar_position: 6
---

Multiply gives you the ability to enter an outsized position in your favorite Vesu market without having to own the deposited assets upfront.

In this guide, we will explain how you can create a multiply feature on a Vesu market.

Make sure you are connected to the app before you proceed. See how [here](./connect.md).

1. Head over to [Vesu](https://vesu.com) and select the "Multiply" tab in the top menu.

![Vesu Multiply](images/multiply_1.png)

__Alternatively__, you can also use the wizzard on the homepage and follow the "I want to multiply" flow.

2. Select the asset you are looking to create your position in. Note that you will have to seed the multiply position with a _net position value_.

![Select multiply asset](images/multiply_2.png)

3. Insert the amount of the selected asset, you'll like to seed the multiply position with.

![Insert seed amount](images/multiply_3.png)

4. Select an asset that you'll use to borrow and multiply your position with.

![Select borrow asset](images/multiply_4.png)

5. Use the slider to chose the multiplier for your position. Ensure it results in a debt amount that exceeds the borrow asset's minimum debt.

![Chose position multiplier](images/multiply_5.png)

6. In the position overview on the right, you will find the position details including the _Net position value_, _Total exposure_, _Position APY_ (this is the net APY and includes the borrow cost already), and position risk metrics. 

Click on "More details" to view additional information such as slippage tolerance, estimated swap amounts, and the maximum paid debt. You can also see if the quote is updated or manually update it by clicking the refresh option.

:::note
The estimated swap amount shown under "More details" is quoted by the Ekubo DEX through which swaps are settled. This quote depends on the liquidity available on the Ekubo DEX. Please review the quote carefully before confirming your transaction, as it determines the _Net position value_ of your Multiply position.
:::


![Review position details](images/multiply_6.png)

7. Confirm the position details and swap parameters by clicking on "Multiply".

![Confirm position](images/multiply_7.png)

8. Confirm your transaction using your wallet provider, to create your position.

![Create position](images/multiply_8.png)
