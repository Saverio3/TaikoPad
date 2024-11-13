import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { bscTestnet } from "wagmi/chains";
import { createConfig, http } from 'wagmi';
import { walletConnect, injected } from 'wagmi/connectors';

export const projectId = '3cba1c661b5a8b71e40f1201e5a1d4e0';

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'LaunchPad',
  description: 'LaunchPad',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  })
})
