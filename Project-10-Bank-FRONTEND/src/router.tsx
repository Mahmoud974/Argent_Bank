import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import User from "./pages/User";
import SignIn from "./pages/SignIn";
import { PrivateRoute, PublicRoute } from "./PrivateRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
   {
    path: "/login",
    element: (
    <PublicRoute>
      <SignIn/>
    </PublicRoute>
    ),
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
