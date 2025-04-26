
import React from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import App from './App';
import './index.css';

// Initialize EmailJS with public key
emailjs.init({
  publicKey: 'rd6OMpMu8vCgCg89X',
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
