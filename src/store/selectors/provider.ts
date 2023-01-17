import { createSelector } from '@reduxjs/toolkit'

export const venomConnectSelector = createSelector(
  (state: AppState) => state.provider.venomConnect,
  (value) => value
)

export const venomProviderSelector = createSelector(
  (state: AppState) => state.provider.venomProvider,
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

export const venomPublicKeySelector = createSelector(
  (state: AppState) => state.provider.publicKey,
  (value) => value
)

export const jwtTokenSelector = createSelector(
  (state: AppState) => state.provider.address,
  (value) => value
)
