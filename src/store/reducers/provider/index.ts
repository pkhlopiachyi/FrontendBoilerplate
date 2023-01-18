/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProviderState } from './types'
import { VenomConnect } from 'venom-connect'
import { WALLET_CONNECTED_KEY } from 'store/sagas/provider'

export const initialState: ProviderState = {
  loading: false,
  error: false,
  address: '',
  publicKey: '',
  balance: 0,
  jwt: '',
  isConnected: localStorage.getItem(WALLET_CONNECTED_KEY) === 'true',
}

const { actions, reducer } = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setVenomConnect: (state, action: PayloadAction<VenomConnect>) => {
      state.loading = true
      state.error = false
      state.venomConnect = action.payload
    },
    setVenomProvider: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.error = true
      state.venomProvider = action.payload
    },
    connectVenomWalletRequest: (state) => {
      state.loading = true
      state.error = false
    },
    connectVenomWalletResponse: (state, action: PayloadAction) => {
      state.loading = false
      state.isConnected = true
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
      state.publicKey = ''
      state.isConnected = false
      state.jwt = ''
    },
    disconnectWalletError: (state) => {
      state.loading = false
      state.error = true
    },
    getWalletDataRequest: (state) => {
      state.loading = true
      state.error = false
    },
    getUserDataResponse: (state, action: PayloadAction<{ address: string; publicKey: string }>) => {
      state.loading = true
      state.address = action.payload.address
      state.publicKey = action.payload.publicKey
    },
    getUserDataError: (state) => {
      state.loading = true
      state.error = false
    },
    getUserBalanceRequest: (state, action: PayloadAction<{ address: string }>) => {
      state.loading = true
      state.error = false
    },
    getUserBalanceResponse: (state, action: PayloadAction<{ balance: number }>) => {
      state.loading = true
      state.error = false
      state.balance = action.payload.balance
    },
    getUserBalanceError: (state) => {
      state.error = true
      state.loading = false
    },
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
  },
})

export { actions as ProviderActions }
export default reducer
