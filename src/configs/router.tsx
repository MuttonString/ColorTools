import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App';
import Picker from '../pages/Picker';
import Filter from '../pages/Filter';
import Game from '../pages/Game';
import Practice from '../pages/Practice';
import Error from '../pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/ColorTools' replace />,
  },
  {
    path: '/ColorTools',
    element: <App />,
    children: [
      {
        path: 'picker',
        element: <Picker />,
      },
      {
        path: 'filter',
        element: <Filter />,
      },
      {
        path: 'practice',
        element: <Practice />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      { path: 'notFound', element: <Error /> },
      {
        path: '*',
        element: <Navigate to='/ColorTools/notFound' replace />,
      },
    ],
  },
]);

export default router;
