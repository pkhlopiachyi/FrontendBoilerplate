import React, { useCallback } from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { useDispatch } from 'react-redux'
import Provider from 'provider'

const HomePage = (): JSX.Element => {
  const dispath = useDispatch()

  return <Provider />
}

export default HomePage
