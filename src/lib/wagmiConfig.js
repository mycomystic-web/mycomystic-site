import { configureChains, createConfig } from 'wagmi';
import { base } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
  [base],
  [publicProvider()]
);

const { connectors: defaultConnectors } = getDefaultWallets({
  appName: 'MycoMystic',
  projectId: 'bb636a650db0d7617517559404e792b8', // ✅ Project ID WalletConnect
  chains,
});

// Remove direct MetaMask connection.
// MetaMask remains available through WalletConnect, which works correctly on iPhone.
const connectors = defaultConnectors.filter(
  (connector) => connector.id !== 'metaMask'
);

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };
export const contractAddress = '0x0040F67debe231Eb2d8116eabb9Ff6ce214c7E94';
