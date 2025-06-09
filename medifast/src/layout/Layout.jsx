import { Outlet } from 'react-router-dom';
import { AdditionalNavbar, Footer, Navbar } from '../auth';
import { FloatingChat } from '../medifast/components/FloatingChat';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AdditionalNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingChat />
      <Footer />
    </div>
  );
};
