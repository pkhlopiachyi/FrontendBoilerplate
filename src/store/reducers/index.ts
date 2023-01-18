import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import history from 'helpers/history'

//reducers
import provider from './provider'
import session from './session'

//states
import { ProviderState } from './provider/types'
import { SessionState } from './session/types'

const rootReducer = combineReducers({
  router: connectRouter(history),
  provider,
  session,
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  provider: ProviderState
  session: SessionState
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
