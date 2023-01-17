/* eslint-disable @typescript-eslint/ban-ts-comment */
import { API } from 'api/axios/wrapper'
import { AxiosResponse } from 'axios'
import { initVenomConnect } from 'provider/initVenomConnect'
import { call, put, select } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import {
  venomAddressSelector,
  venomConnectSelector,
  venomProviderSelector,
  venomPublicKeySelector,
} from 'store/selectors/provider'
import VenomConnect from 'venom-connect'

export const WALLET_CONNECTED_KEY = 'walletConnected'
export const SESSION_KEY = 'sessionToken'
export const RE_NEW_TOKEN = 'reNewToken'

export function* connectVenomWalletSaga() {
  try {
    const venomConnect: VenomConnect = yield select(venomConnectSelector)
    yield venomConnect.connect()
    //@ts-ignore
    const venomProvider = yield select(venomProviderSelector)
    const publicKey: string = yield select(venomPublicKeySelector)
    const address: string = yield select(venomAddressSelector)

    const { dataHash, signature } = yield venomProvider.signData({
      publicKey: publicKey,
      data: btoa(JSON.stringify({ address })),
    })

    console.log(dataHash, signature)
  } catch (e) {
    console.log(e)

    yield put(ProviderActions.connectVenomWalletError())
  }
}
