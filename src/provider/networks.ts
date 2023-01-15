export const NETWORKS = {
  venom: {
    name: 'Venom Mainnet',
    checkNetworkId: 1000,
    connection: {
      id: 1000,
      group: 'venom_mainnet',
      type: 'jrpc',
      data: {
        endpoint: 'https://jrpc.venom.foundation/rpc',
      },
    },
  },
  venomTestnet: {
    name: 'Venom Testnet',
    checkNetworkId: 1010,
    connection: {
      id: 1010,
      group: 'venom_testnet',
      type: 'jrpc',
      data: {
        endpoint: 'https://jrpc.venom.foundation/rpc',
      },
    },
  },
  everscale: {
    name: 'Everscale Mainnet',
    checkNetworkId: 1,
    connection: 'mainnetJrpc',
  },
}

export const getNetworkData = (checkNetworkId: number, field: keyof typeof NETWORKS.venom) => {
  switch (checkNetworkId) {
    case 1:
      return NETWORKS.everscale[field]

    case 1010:
      return NETWORKS.venomTestnet[field]

    case 1000:
    default:
      return NETWORKS.venom[field]
  }
}
