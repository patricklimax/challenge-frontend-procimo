import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Header } from './components/header.tsx';
import { UserManual } from './components/user-manual.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="flex flex-col gap-2 antialiased">
      <App />
      <Header />
      <UserManual />
    </main>
  </StrictMode>,
);
