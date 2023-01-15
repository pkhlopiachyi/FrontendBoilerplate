/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProviderState } from './types'
import { VenomConnect } from 'venom-connect'

export const initialState: ProviderState = {
  loading: false,
  error: false,
  address: '',
  publicKey: '',
  balance: 0,
  jwt: '',
}

const { actions, reducer } = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setVenomConnectRequest: (state) => {
      state.loading = true
      state.error = false
    },
    setVenomConnectResponse: (state, action: PayloadAction<VenomConnect>) => {
      state.loading = false
      state.walletConnect = action.payload
    },
    setVenomProviderResponse: (state) => {
      state.loading = false
      state.error = true
    },
    setProviderRequest: (state, action: PayloadAction<any>) => {
      state.loading = true
      state.error = false
    },
    setProviderResponse: (state, action: PayloadAction<any>) => {
      state.provider = action.payload
      state.loading = false
    },
    setProviderError: (state) => {
      state.loading = false
      state.error = true
    },
    connectVenomWalletRequest: (state) => {
      state.loading = true
      state.error = false
    },
    connectVenomWalletResponse: (
      state,
      action: PayloadAction<{ address: string; balance: number; jwt: string; publicKey: string }>
    ) => {
      state.loading = false
      state.address = action.payload.address
      state.balance = action.payload.balance
      state.jwt = action.payload.jwt
      state.publicKey = action.payload.publicKey
    },
    connectVenomWalletError: (state) => {
      state.loading = false
      state.error = false
    },
    disconnectWalletRequest: (state) => {
      state.loading = true
      state.error = false
    },
    disconnectWalletResponse: (state) => {
      state.loading = false
      state.address = ''
      state.balance = 0
    },
    disconnectWalletError: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export { actions as ProviderActions }
export default reducer
