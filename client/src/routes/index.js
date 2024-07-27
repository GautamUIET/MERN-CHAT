import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import CheckEmail from '../pages/CheckEmail';
import Home from '../pages/Home';
import CheckPass from '../pages/CheckPass';
import Message from '../components/Message';
import App from '../App';
import AuthLayouts from '../layout';
import Forgot from '../pages/Forgot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'register',
        element: <AuthLayouts> <RegisterPage /> </AuthLayouts>
      },
      {
        path: 'email',
        element: <AuthLayouts> <CheckEmail /></AuthLayouts>
      },
      {
        path: 'password',
        element: <AuthLayouts><CheckPass /></AuthLayouts>
      },
        {
        path: 'forgot-password',
        element: <AuthLayouts><Forgot /></AuthLayouts>
      },
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: ':userId',
            element: <Message />
          }
        ]
      }
    ]
  }
]);

export default router;
