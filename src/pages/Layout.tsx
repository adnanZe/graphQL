import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout() {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
