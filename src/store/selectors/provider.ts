import { createSelector } from '@reduxjs/toolkit'

export const venomConnectSelector = createSelector(
  (state: AppState) => state.provider.walletConnect,
  (value) => value
)

export const providerSelector = createSelector(
  (state: AppState) => state.provider.provider,
  (value) => value
)

export const venomBalanceSelector = createSelector(
  (state: AppState) => state.provider.balance,
  (value) => value
)

export const venomAddressSelector = createSelector(
  (state: AppState) => state.provider.address,
  (value) => value
)

export const jwtTokenSelector = createSelector(
  (state: AppState) => state.provider.address,
  (value) => value
)
