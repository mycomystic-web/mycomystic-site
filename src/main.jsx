// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';
import { config, chains } from './lib/wagmiConfig';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import VerifyPage from './pages/verify';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/verify" element={<VerifyPage />} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
