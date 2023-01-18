import { useCallback, useEffect } from 'react'

import { Box, Button } from '@material-ui/core'
import { initVenomConnect } from './initVenomConnect'
import { useDispatch, useSelector } from 'react-redux'
import { ProviderActions } from 'store/reducers/provider'
import {
  isWalletConnectedSelector,
  venomAddressSelector,
  venomConnectSelector,
  venomProviderSelector,
  venomPublicKeySelector,
} from 'store/selectors/provider'
import { SessionActions } from 'store/reducers/session'
import { usePrevious } from 'react-use'
import { isLoggedInSelector } from 'store/selectors/session'

const Provider = (): JSX.Element => {
  const dispatch = useDispatch()

  const venomProvider = useSelector(venomProviderSelector)
  const venomConnect = useSelector(venomConnectSelector)

  const address = useSelector(venomAddressSelector)
  const publicKey = useSelector(venomPublicKeySelector)
  const isWalletConnected = useSelector(isWalletConnectedSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)

  const prevAddress = usePrevious(address)

  const onInitButtonClick = useCallback(async () => {
    const initedVenomConnect = await initVenomConnect()
    dispatch(ProviderActions.setVenomConnect(initedVenomConnect))

    const auth = await initedVenomConnect?.checkAuth()
    if (auth) await getAddress(initedVenomConnect)
  }, [])

  useEffect(() => {
    onInitButtonClick()
  }, [])

  // console.log({ window })
  // console.log({ hasVenomProvider: window.__hasVenomProvider })
  // console.log({ venom: window.__venom })

  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.()

    const address = providerState?.permissions.accountInteraction?.address.toString()

    return address
  }

  const getBalance = async (provider: any, _address: string) => {
    try {
      const providerBalance = await provider?.getBalance?.(_address)

      return providerBalance
    } catch (error) {
      return undefined
    }
  }

  const getPublicKey = async (provider: any) => {
    const providerState = await provider?.getProviderState?.()

    const address = providerState?.permissions.accountInteraction?.publicKey.toString()

    return address
  }

  const onConnectButtonClick = async () => {
    dispatch(ProviderActions.connectVenomWalletRequest())
  }

  const onDisconnectButtonClick = async () => {
    dispatch(ProviderActions.disconnectWalletRequest())
  }

  const onSignClick = async () => {
    const data = { address }

    if (address && publicKey) {
      console.log(`data::`, data)

      const signed = await venomProvider.signData({
        publicKey: publicKey,
        data: btoa(JSON.stringify(data)),
      })
      console.log(`signed::`, signed)
    }
  }

  const onConnect = async (provider: any) => {
    console.log('onConnect')
    dispatch(ProviderActions.setVenomProvider(provider))
    const { permissions } = await provider.getProviderState?.()

    if (permissions.accountInteraction && isWalletConnected) {
      if (isLoggedIn) {
        dispatch(ProviderActions.getWalletDataRequest())
      } else {
        console.log('here')
        dispatch(SessionActions.loginRequest())
      }
    }
  }

  useEffect(() => {
    const off = venomConnect?.on('connect', onConnect)

    return () => {
      off?.()
    }
  }, [venomConnect])

  useEffect(() => {
    if (venomProvider && isWalletConnected) {
      dispatch(ProviderActions.getWalletDataRequest())
    }
  }, [isWalletConnected, venomProvider])

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={onConnectButtonClick}>
        Connnect
      </Button>
      <Button variant="contained" color="primary" onClick={onDisconnectButtonClick}>
        Disconnect
      </Button>
      <Button variant="contained" color="primary" onClick={onSignClick}>
        Sign
      </Button>
    </Box>
  )
}

export default Provider
