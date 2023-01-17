import { useEffect, useState } from 'react'

import { Box, Button } from '@material-ui/core'
import { initVenomConnect } from './initVenomConnect'

const Provider = () => {
  const [venomConnect, setVenomConnect] = useState<any>()
  const [venomProvider, setVenomProvider] = useState<any>()
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
  const [publicKey, setPublicKey] = useState()

  const onInitButtonClick = async () => {
    const initedVenomConnect = await initVenomConnect()
    setVenomConnect(initedVenomConnect)

    await checkAuth(initedVenomConnect)
  }

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

  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth()
    if (auth) await getAddress(_venomConnect)
  }

  const onConnectButtonClick = async () => {
    venomConnect?.connect()
  }

  const onDisconnectButtonClick = async () => {
    venomProvider?.disconnect()
  }

  const onSignClick = async () => {
    const providerState = await venomProvider.getProviderState()
    const _address = providerState?.permissions.accountInteraction?.address
    // const _publicKey = providerState?.permissions.accountInteraction?.publicKey

    const data = { _address }

    if (_address && publicKey) {
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

    const publicKey = _provider ? await getPublicKey(_provider) : undefined

    setAddress(_address)
    setBalance(_balance)
    setPublicKey(publicKey)

    if (_provider && _address)
      setTimeout(() => {
        check(_provider)
      }, 100)
  }

  const onConnect = async (provider: any) => {
    setVenomProvider(provider)
    // await provider.ensureInitialized()

    check(provider)
  }

  useEffect(() => {
    const off = venomConnect?.on('connect', onConnect)

    return () => {
      off?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
