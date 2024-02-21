import { createBrowserRouter } from "react-router-dom";
import Navigator from "../layout/Navigator";
import Login from "../pages/Login/Login";
import NotFound from "../pages/404/404";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import DiscoverPost from "../pages/DiscoverPost/DiscoverPost";
import Visited from "../pages/Visited/Visited";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigator />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
/*       {
        path: "/discover",
        element: <DiscoverFreind />,
      }, */
      {
        path: "/global",
        element: <DiscoverPost />,
      },
      {
        path: "/friend/:id",
        element: <Visited />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
