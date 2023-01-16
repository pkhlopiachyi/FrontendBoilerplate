import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './layouts'
import routes from 'constants/routes'
import HomePage from 'pages/HomePage'

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
