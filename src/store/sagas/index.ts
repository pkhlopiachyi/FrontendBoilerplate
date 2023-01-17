import { all, takeLatest } from 'redux-saga/effects'
import { ProviderActions } from 'store/reducers/provider'
import { connectVenomWalletSaga } from './provider'

export default function* root() {
  yield all([takeLatest(ProviderActions.connectVenomWalletRequest, connectVenomWalletSaga)])
}
