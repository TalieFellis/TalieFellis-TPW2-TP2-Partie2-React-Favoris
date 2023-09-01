// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query'; // Importez QueryClient et QueryClientProvider

const queryClient = new QueryClient(); // Créez une instance de QueryClient

createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}> {/* Enveloppez votre application avec QueryClientProvider */}
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </Router>
);
