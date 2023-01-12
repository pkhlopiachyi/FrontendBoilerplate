import { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './layouts'
import routes from 'constants/routes'
import HomePage from 'pages/HomePage'

interface HOCProps {
  children: ReactElement
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
        <Route path={routes.ROUTE_HOME} element={<HomePage />} />
        <Route path="*" element={<Navigate to={routes.ROUTE_HOME} />} />
      </Routes>
    </Layout>
  )
}
