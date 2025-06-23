import { base } from 'viem/chains';
import { createConfig, http } from '@wagmi/core';

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
});
