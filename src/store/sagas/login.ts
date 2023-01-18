/* eslint-disable @typescript-eslint/ban-ts-comment */
import { API } from 'api/axios/wrapper'
import { AxiosResponse } from 'axios'
import { call, put, select } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import { SessionActions } from 'store/reducers/session'
import { SigatureType } from 'store/reducers/session/types'
import { isWalletConnectedSelector, venomAddressSelector, venomProviderSelector } from 'store/selectors/provider'
import { venomPublicKeySelector } from '../selectors/provider'
import { SESSION_KEY, WALLET_CONNECTED_KEY } from './provider'

export const LOGGED_ID_KEY = 'isLoggedIn'

export function* loginSaga() {
  try {
    //@ts-ignore
    const venomProvider = yield select(venomProviderSelector)

    const { permissions } = yield venomProvider.getProviderState?.()

    if (!permissions.accountInteraction) {
      throw new Error('Wallet is no connected')
    }

    const { publicKey, address: addressHash } = permissions.accountInteraction
    const address = addressHash.toString()

    if (address && publicKey) {
      const { dataHash, signature }: SigatureType = yield venomProvider.signData({
        publicKey: publicKey,
        data: btoa(JSON.stringify({ address })),
      })

      const { data }: AxiosResponse = yield call(API.post({ source: 'auth' }), '/login', {
        address: address,
        public_key: publicKey,
        data_hash: dataHash,
        signature,
      })

      console.log(data)
    } else {
      throw new Error('No wallet data')
    }

    yield put(ProviderActions.getWalletDataRequest())

    yield localStorage.setItem(WALLET_CONNECTED_KEY, 'true')
  } catch (e) {
    yield put(SessionActions.loginError())
  }
}
