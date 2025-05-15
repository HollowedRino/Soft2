import { Outlet } from 'react-router-dom';
import { AdditionalNavbar, Footer, Navbar } from '../auth';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AdditionalNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
