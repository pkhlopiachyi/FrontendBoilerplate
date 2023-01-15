import { lazy, useCallback, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './layouts'
import routes from 'constants/routes'
import HomePage from 'pages/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { ProviderActions } from 'store/reducers/provider'
import { venomConnectSelector } from 'store/selectors/provider'

interface HOCProps {
  children: JSX.Element
  isLoggedIn: boolean
}

const PrivateRoute = ({ children, isLoggedIn }: HOCProps) => {
  return isLoggedIn ? children : <Navigate to="/" />
}

const PublicRoute = ({ children, isLoggedIn }: HOCProps) => {
  return isLoggedIn ? <Navigate to="/" /> : children
}

export const AppRouter = (): JSX.Element => {
  const dispatch = useDispatch()

  const venomConnect = useSelector(venomConnectSelector)

  const onConnect = useCallback(
    (provider) => {
      dispatch(ProviderActions.setProviderRequest(provider))
    },
    [dispatch]
  )

  useEffect(() => {
    const off = venomConnect?.on('connect', onConnect)

    return () => {
      off?.()
    }
  }, [venomConnect])

  useEffect(() => {
    dispatch(ProviderActions.setVenomConnectRequest())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route
          path={routes.ROUTE_HOME}
          element={
            // <PublicRoute isLoggedIn={true}>
            <HomePage />
            // </PublicRoute>
          }
        />
      </Routes>
    </Layout>
  )
}
