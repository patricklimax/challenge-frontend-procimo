import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Header } from './components/header.tsx';
import { UserManual } from './components/user-manual.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex flex-col gap-2'>
      <main className="w-[calc(100vw-0.5rem] h-screen antialiased">
        <App />
        <Header />
      </main>
      <UserManual/>
    </div>
  </StrictMode>,
);
