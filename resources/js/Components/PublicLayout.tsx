import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PublicLayoutProps {
  children: ReactNode;
  currentPage?: string;
}

export default function PublicLayout({ children, currentPage = 'home' }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col font-sans text-zinc-900 selection:bg-red-600 selection:text-white" id="app-root-container">
      <Header currentPage={currentPage} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
