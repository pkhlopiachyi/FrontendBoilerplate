import { all, takeLatest } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import { SessionActions } from 'store/reducers/session'
import { loginSaga } from './login'
import { connectVenomWalletSaga, disconnectVenomWalletSaga, getUserDataSaga } from './provider'

export default function* root() {
  yield all([
    takeLatest(ProviderActions.connectVenomWalletRequest, connectVenomWalletSaga),
    takeLatest(ProviderActions.getWalletDataRequest, getUserDataSaga),
    takeLatest(ProviderActions.disconnectWalletRequest, disconnectVenomWalletSaga),

    takeLatest(SessionActions.loginRequest, loginSaga),
  ])
}
