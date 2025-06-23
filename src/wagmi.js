import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MycoMystic',
  projectId: 'bb636a650db0d7617517559404e792b8',
  chains: [base],
  ssr: false,
});
