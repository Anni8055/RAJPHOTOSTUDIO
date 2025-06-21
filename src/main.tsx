import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx'
import './index.css'

// Function to register service worker
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
          console.log('ServiceWorker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
};

// Register the service worker if in production
if (import.meta.env.PROD) {
  registerServiceWorker();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
