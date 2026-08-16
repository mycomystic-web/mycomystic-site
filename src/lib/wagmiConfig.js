import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Baby Orca',
  projectId: 'bb636a650db0d7617517559404e792b8',
  chains,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };

export const contractAddress =
  '0x0040F67debe231Eb2d8116eabb9Ff6ce214c7E94';