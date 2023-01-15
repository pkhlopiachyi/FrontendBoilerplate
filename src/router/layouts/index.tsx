import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'
import { Outlet, useLocation } from 'react-router-dom'

export const Layout = ({ children }: any): JSX.Element => {
  const classes = useStyles()
  const location = useLocation()

  if (location.pathname.includes('/login')) {
    return <Box className={classes.loginLayout}>{children}</Box>
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.pageWrapper}>{children}</Box>
      </Box>
    </Box>
  )
}
