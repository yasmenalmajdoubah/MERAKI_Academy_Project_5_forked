import { createBrowserRouter } from "react-router-dom";
import Navigator from "../layout/Navigator";
import Login from "../pages/Login/Login";
import NotFound from "../pages/404/404";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import DiscoverPost from "../pages/DiscoverPost/DiscoverPost";
import Visited from "../pages/Visited/Visited";
import Jobs from "../pages/Jobs/Jobs";
import Settings from "../pages/settings/Settings";
import HelpCenter from "../pages/settings/HelpCenter";
import Chatting from "../pages/Chatting/Chatting";

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
      {
        path: "/global",
        element: <DiscoverPost />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/friend/:id",
        element: <Visited />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/chat",
        element: <Chatting/>
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
