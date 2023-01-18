import { createSelector } from '@reduxjs/toolkit'

export const isLoggedInSelector = createSelector(
  (state: AppState) => state.session.isLoggedIn,
  (value) => value
)
