import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Configura redes y clientes
const { chains, publicClient } = configureChains(
  [base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "MycoMystic",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
