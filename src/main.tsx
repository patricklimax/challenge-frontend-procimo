import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Header } from './components/header.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="w-[calc(100vw-0.5rem] h-screen antialiased">
      <App />
      <Header />
    </main>
  </StrictMode>,
);
