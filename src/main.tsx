import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Header } from './components/header.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="flex min-h-screen flex-col gap-2 p-2 md:flex-row">
      <Header />
      <App />
    </main>
  </StrictMode>,
);
