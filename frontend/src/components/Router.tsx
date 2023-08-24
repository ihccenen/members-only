import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Signup from './Signup';
import Login from './Login';
import ErrorPage from './ErrorPage';
import { createContext, useState } from 'react';
import logoutUser from '../lib/logoutUser';
import MessagesList from './MessagesList';
import { loader as messagesListLoader } from './MessagesList';

type User = {
  name: string;
  id: string;
  membership: string;
  isAdmin: boolean;
};

type UserType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserType>({} as UserType);

export default function Router() {
  const u = localStorage.getItem('user');

  const [user, setUser] = useState<User | null>(u ? JSON.parse(u) : null);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MessagesList />,
          loader: messagesListLoader,
          errorElement: <ErrorPage />,
        },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
      ],
    },
  ]);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    logoutUser();
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
