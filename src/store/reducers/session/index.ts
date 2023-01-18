/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionState } from './types'
import { SESSION_KEY } from 'store/sagas/provider'
import { LOGGED_ID_KEY } from 'store/sagas/login'

export const initialState: SessionState = {
  loading: false,
  error: false,
  jwt: localStorage.getItem(SESSION_KEY) || '',
  isLoggedIn: localStorage.getItem(LOGGED_ID_KEY) === 'true',
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true
      state.error = false
    },
    loginResponse: (state, action: PayloadAction<{ jwt: string }>) => {
      state.loading = true
      state.jwt = action.payload.jwt
      state.isLoggedIn = true
    },
    loginError: (state) => {
      state.error = true
      state.loading = false
    },
    logoutRequest: (state) => {
      state.loading = true
      state.error = false
    },
    logoutResponse: (state) => {
      state.loading = false
      state.jwt = ''
      state.isLoggedIn = false
    },
    logoutError: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export { actions as SessionActions }
export default reducer
