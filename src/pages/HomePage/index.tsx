import React, { useCallback } from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { useDispatch } from 'react-redux'
import { ProviderActions } from 'store/reducers/provider'

const HomePage = (): JSX.Element => {
  const dispath = useDispatch()

  const onClick = useCallback(() => {
    dispath(ProviderActions.connectVenomWalletRequest())
  }, [dispath])

  return (
    <Button color="primary" variant="contained" onClick={onClick}>
      Connect
    </Button>
  )
}

export default HomePage
