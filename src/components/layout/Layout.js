import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Header title='Nodepop' list='Adverts' />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
