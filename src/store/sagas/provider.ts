/* eslint-disable @typescript-eslint/ban-ts-comment */
import { API } from 'api/axios/wrapper'
import { AxiosResponse } from 'axios'
import { initVenomConnect } from 'provider/initVenomConnect'
import { call, put, select } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import { providerSelector, venomConnectSelector } from 'store/selectors/provider'
import VenomConnect from 'venom-connect'

export const WALLET_CONNECTED_KEY = 'walletConnected'
export const SESSION_KEY = 'sessionToken'
export const RE_NEW_TOKEN = 'reNewToken'

export function* setVenomConnectSaga(action: ReturnType<typeof ProviderActions.setVenomConnectRequest>) {
  try {
    const venomConnect: VenomConnect = yield initVenomConnect()

    yield put(ProviderActions.setVenomConnectResponse(venomConnect))
    // yield venomConnect.checkAuth()
  } catch (e) {
    console.log(e)
    yield put(ProviderActions.setVenomProviderResponse())
  }
}

export function* setProviderSaga(action: ReturnType<typeof ProviderActions.setProviderRequest>) {
  try {
    const provider = action.payload

    yield put(ProviderActions.setProviderResponse(provider))
  } catch (e) {
    yield put(ProviderActions.setProviderError())
  }
}

const getBalance = async (provider: any, _address: string) => {
  try {
    const providerBalance = await provider?.getBalance?.(_address)

    return +providerBalance * 10 ** -9
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const getAddress = async (provider: any) => {
  try {
    const providerState = await provider?.getProviderState?.()
    const address = providerState?.permissions.accountInteraction?.address.toString()

    return address
  } catch (e) {
    console.log(e)

    return ''
  }
}

const getPublicKey = async (provider: any) => {
  const providerState = await provider?.getProviderState?.()
  const publicKey = providerState?.permissions.accountInteraction?.publicKey

  return publicKey
}

export function* connectVenomWalletSaga() {
  try {
    const venomConnect: VenomConnect = yield select(venomConnectSelector)
    console.log(venomConnect)
    //@ts-ignore
    yield venomConnect.connect()
  } catch (e) {
    console.log(e)

    yield put(ProviderActions.connectVenomWalletError())
  }
}
