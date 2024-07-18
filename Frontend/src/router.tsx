import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import User from "./pages/User";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
   {
    path: "/login",
    element: <SignIn/>,
  },{
    path: '/profile',
    element: (
<PrivateRoute>

  <User />
</PrivateRoute>
 
    ),
  },
  {
    path: '*',
    element: <Home/>,}
]);
