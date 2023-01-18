/* eslint-disable @typescript-eslint/ban-ts-comment */
import { put, select, call } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import { SigatureType } from 'store/reducers/session/types'
import { isWalletConnectedSelector, venomConnectSelector, venomProviderSelector } from 'store/selectors/provider'
import VenomConnect from 'venom-connect'

export const WALLET_CONNECTED_KEY = 'walletConnected'
export const SESSION_KEY = 'sessionToken'
export const RE_NEW_TOKEN = 'reNewToken'

export function* getUserDataSaga(action: ReturnType<typeof ProviderActions.getWalletDataRequest>) {
  try {
    //@ts-ignore
    const venomProvider = yield select(venomProviderSelector)

    if (!venomProvider) throw new Error('No venom provider')

    const isWalletConnected: boolean = yield select(isWalletConnectedSelector)

    if (!isWalletConnected) {
      yield venomProvider.disconnect()
      throw new Error('Wallet is no connected')
    }

    const { permissions } = yield venomProvider.getProviderState?.()

    if (!permissions.accountInteraction) {
      throw new Error('Wallet is no connected')
    }

    const { publicKey, address: addressHash } = permissions.accountInteraction
    const address = addressHash.toString()

    yield put(ProviderActions.getUserDataResponse({ address, publicKey }))
  } catch (e) {
    console.log(e)
    yield put(ProviderActions.getUserDataError())
  }
}

export function* connectVenomWalletSaga() {
  try {
    const venomConnect: VenomConnect = yield select(venomConnectSelector)

    yield venomConnect.connect()
    localStorage.setItem(WALLET_CONNECTED_KEY, 'true')

    //@ts-ignore
    const venomProvider = yield select(venomProviderSelector)

    const { permissions } = yield venomProvider.getProviderState?.()

    console.log(permissions)
    const { publicKey, address: addressHash } = permissions.accountInteraction
    const address = addressHash.toString()

    const { dataHash, signature }: SigatureType = yield venomProvider.signData({
      publicKey: publicKey,
      data: btoa(JSON.stringify({ address })),
    })

    console.log(dataHash, signature)

    yield put(ProviderActions.connectVenomWalletResponse())
  } catch (e) {
    yield put(ProviderActions.connectVenomWalletError())
  }
}

export function* disconnectVenomWalletSaga() {
  try {
    //@ts-ignore
    const venomProvider = yield select(venomProviderSelector)

    if (!venomProvider) throw new Error('No venom provider')

    yield venomProvider.disconnect()
    localStorage.setItem(WALLET_CONNECTED_KEY, 'false')
  } catch (e) {
    yield put(ProviderActions.disconnectWalletError())
  }
}
