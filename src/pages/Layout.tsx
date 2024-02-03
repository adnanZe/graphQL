import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/first-page">First page</Link>
          </li>
        </ul>
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
