import { ProviderRpcClient } from 'everscale-inpage-provider'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'
import { VenomConnect } from 'venom-connect'

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

export const initVenomConnect = async (checkNetworkId = 1010) => {
  return new VenomConnect({
    theme: 'venom',
    checkNetworkId: checkNetworkId,
    checkNetworkName: 'Venom Testnet',
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            // NPM package
            package: ProviderRpcClient,
            packageOptions: {
              fallback: VenomConnect.getPromise('venomwallet', 'extension') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: standaloneFallback,
              forceUseFallback: true,
            },

            // Setup
            id: 'extension',
            type: 'extension',
          },
        ],
        defaultWalletWaysToConnect: [
          // List of enabled options
          'mobile',
          'ios',
          'android',
        ],
      },
      everwallet: {
        links: {
          qr: null,
        },
        walletWaysToConnect: [
          {
            // NPM package
            package: ProviderRpcClient,
            packageOptions: {
              fallback: VenomConnect.getPromise('everwallet', 'extension') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: () => standaloneFallback(),
              forceUseFallback: true,
            },
            id: 'extension',
            type: 'extension',
          },
        ],
        defaultWalletWaysToConnect: [
          // List of enabled options
          'mobile',
          'ios',
          'android',
        ],
      },
    },
  })
}
