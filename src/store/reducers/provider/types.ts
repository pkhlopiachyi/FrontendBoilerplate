import { VenomConnect } from 'venom-connect'

export interface ProviderState {
  venomConnect?: VenomConnect
  venomProvider?: any
  loading: boolean
  error: boolean
  address: string
  publicKey: string
  balance: number
  jwt: string
}
