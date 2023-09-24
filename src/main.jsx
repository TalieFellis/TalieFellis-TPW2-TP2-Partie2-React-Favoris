// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import favoritesReducer from '../favoritesSlice';

const queryClient = new QueryClient();

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  </Router>
);

