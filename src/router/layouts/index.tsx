import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'
import { Header } from 'shared/components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { SidebarMenu } from 'shared/components/SidebarMenu'

export const Layout = ({ children }: any): JSX.Element => {
  const classes = useStyles()
  const location = useLocation()

  if (location.pathname.includes('/login')) {
    return <Box className={classes.loginLayout}>{children}</Box>
  }

  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.content}>
        <SidebarMenu />
        <Box className={classes.pageWrapper}>{children}</Box>
      </Box>
    </Box>
  )
}
