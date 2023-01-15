import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import history from 'helpers/history'

//reducers
import provider from './provider'

//states
import { ProviderState } from './provider/types'

const rootReducer = combineReducers({
  router: connectRouter(history),
  provider,
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  provider: ProviderState
}

declare global {
  type AppState = RootState
  type AppSelector<T = unknown> = (state: AppState) => T
}

// With this, `useSelector(state => ...)` automatically infers `state` param as `AppState`
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends AppState {}
}

export default rootReducer
