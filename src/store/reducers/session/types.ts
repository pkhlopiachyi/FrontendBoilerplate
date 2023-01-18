export interface SessionState {
  jwt: string
  loading: boolean
  error: boolean
  isLoggedIn: boolean
}

export type SigatureType = {
  dataHash: string
  signature: string
  signatureHex: string
  signatureParts: {
    high: string
    low: string
  }
}
