import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
