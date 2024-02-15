import { createBrowserRouter } from "react-router-dom";
import Navigator from "../layout/Navigator";
import Login from "../pages/Login/Login";
import NotFound from "../pages/404/404";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import UserPofile from "../pages/UserPofile/UserPofile";
import DiscoverFreind from "../pages/DiscoverFreind/DiscoverFreind";
import DiscoverPost from "../pages/DiscoverPost/DiscoverPost";

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
        element: <UserPofile />,
      },
      {
        path: "/discover",
        element: <DiscoverFreind />,
      }, 
      {
        path: "/global",
        element: <DiscoverPost/>
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
