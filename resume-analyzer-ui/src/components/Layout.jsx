import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CopyrightFooter from './CopyrightFooter';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CopyrightFooter />
    </div>
  );
};

export default Layout;
