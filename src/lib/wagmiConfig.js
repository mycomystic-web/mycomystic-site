import { configureChains, createConfig } from 'wagmi';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { base } from 'viem/chains';

const { chains, publicClient } = configureChains(
  [base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'MycoMystic',
  projectId: 'mycomystic',
  chains,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const contractAddress = '0x0040F67debe231Eb2d8116eabb9Ff6ce214c7E94';
export { chains };
