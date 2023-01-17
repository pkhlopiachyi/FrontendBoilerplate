import { useCallback, useEffect, useState } from 'react'

import { Box, Button } from '@material-ui/core'
import { initVenomConnect } from './initVenomConnect'
import { useDispatch, useSelector } from 'react-redux'
import { ProviderActions } from 'store/reducers/provider'
import {
  venomAddressSelector,
  venomConnectSelector,
  venomProviderSelector,
  venomPublicKeySelector,
} from 'store/selectors/provider'

const Provider = () => {
  const dispatch = useDispatch()

  const venomProvider = useSelector(venomProviderSelector)
  const venomConnect = useSelector(venomConnectSelector)

  const address = useSelector(venomAddressSelector)
  const publicKey = useSelector(venomPublicKeySelector)

  const onInitButtonClick = useCallback(async () => {
    const initedVenomConnect = await initVenomConnect()
    dispatch(ProviderActions.setVenomConnect(initedVenomConnect))

    const auth = await initedVenomConnect?.checkAuth()
    if (auth) await getAddress(initedVenomConnect)
  }, [])

  useEffect(() => {
    onInitButtonClick()
  }, [])

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
    // venomConnect?.connect()
  }

  const onDisconnectButtonClick = async () => {
    venomProvider?.disconnect()
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

  const check = async (_provider: any) => {
    const _address = _provider ? await getAddress(_provider) : undefined
    const _balance = _provider && _address ? await getBalance(_provider, _address) : undefined

    const _publicKey = _provider ? await getPublicKey(_provider) : undefined

    dispatch(ProviderActions.setUsetData({ address: _address, balance: _balance, publicKey: _publicKey }))

    console.log(_address)
    console.log(_balance)
    console.log(_publicKey)

    // if (_provider && address)
    //   setTimeout(() => {
    //     check(_provider)
    //   }, 100)
  }

  const onConnect = async (provider: any) => {
    dispatch(ProviderActions.setVenomProvider(provider))

    check(provider)
  }

  useEffect(() => {
    const off = venomConnect?.on('connect', onConnect)

    return () => {
      off?.()
    }
  }, [venomConnect])

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
