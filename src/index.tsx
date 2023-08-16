import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Todo from './pages/Todo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/todo',
    element: <Todo />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
