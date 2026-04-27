import { Outlet } from 'react-router-dom';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/Navbar';

const SiteLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SiteLayout;
