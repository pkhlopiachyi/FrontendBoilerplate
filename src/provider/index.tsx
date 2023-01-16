import { Address, ProviderRpcClient } from 'everscale-inpage-provider'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'
import { useEffect, useState } from 'react'

import { VenomConnect } from 'venom-connect'

import { Box, Button } from '@material-ui/core'
import { initVenomConnect } from './initVenomConnect'

const initTheme = 'light' as const

const standaloneFallback = () =>
  EverscaleStandaloneClient.create({
    connection: {
      id: 1010,
      group: 'venom_testnet',
      type: 'jrpc',
      data: {
        endpoint: 'https://jrpc.venom.foundation/rpc',
      },
    },
  })

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

  useEffect(() => {
    console.log('here')

    console.log(address)
    console.log(balance)
  }, [venomProvider, address, balance])

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

    const address = providerState?.permissions.accountInteraction?.address.toString()

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
    await venomProvider.ensureInitialized()

    if (address && publicKey) {
      await venomProvider?.signData({
        publicKey,
        data: btoa(JSON.stringify({ address: 'ekrer' })),
      })
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
