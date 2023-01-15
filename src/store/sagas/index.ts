import { all, takeLatest } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import { connectVenomWalletSaga, setProviderSaga, setVenomConnectSaga } from './provider'

export default function* root() {
  yield all([
    takeLatest(ProviderActions.setVenomConnectRequest, setVenomConnectSaga),
    takeLatest(ProviderActions.setProviderRequest, setProviderSaga),

    takeLatest(ProviderActions.connectVenomWalletRequest, connectVenomWalletSaga),
  ])
}
