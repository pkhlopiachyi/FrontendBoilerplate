/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProviderState } from './types'
import { VenomConnect } from 'venom-connect'
import { string } from 'yup'

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
    setUsetData: (state, action: PayloadAction<{ address: string; publicKey: string; balance: number }>) => {
      state.address = action.payload.address
      state.publicKey = action.payload.publicKey
      state.balance = action.payload.balance
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
