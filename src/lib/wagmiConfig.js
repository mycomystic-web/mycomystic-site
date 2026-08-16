import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

import {
  rainbowWallet,
  coinbaseWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const projectId = 'bb636a650db0d7617517559404e792b8';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      rainbowWallet({
        chains,
        projectId,
      }),

      coinbaseWallet({
        chains,
        appName: 'MycoMystic',
        projectId,
      }),

      trustWallet({
        chains,
        projectId,
      }),

      walletConnectWallet({
        chains,
        projectId,
      }),
    ],
  },
]);

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };

export const contractAddress =
  '0x0040F67debe231Eb2d8116eabb9Ff6ce214c7E94';