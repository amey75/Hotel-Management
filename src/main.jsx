import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from './SignUp';
import Hotels from './Hotels';
import Login from './Login';
import Hotel_Description from './Hotel_Description';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Check_Out from './Check_Out';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  }, 
  {
    path:"/Hotels",
    element:<Hotels />
  }, 
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/hotel/:id",
    element:<Hotel_Description/>
  },
  {
    path:"/check_out",
    element:<Check_Out/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
