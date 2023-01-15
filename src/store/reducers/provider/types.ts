import { VenomConnect } from 'venom-connect'

export interface ProviderState {
  walletConnect?: VenomConnect
  provider?: any
  loading: boolean
  error: boolean
  address: string
  publicKey: string
  balance: number
  jwt: string
}
