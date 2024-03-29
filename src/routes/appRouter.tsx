import { createBrowserRouter } from 'react-router-dom';

import FirstPage from '../pages/FirstPage';
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import Search from '../components/Search';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'first-page',
        element: <FirstPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
]);

export default appRouter;
