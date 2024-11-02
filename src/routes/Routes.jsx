import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Auth from "../components/Auth/Auth";
import MovieDetailsPage from "../pages/Home/MovieDetailsPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          // <Auth>
            <Home />
          // </Auth>
        ),
      },

      {
        path: "/movie/:id",
        element: <MovieDetailsPage />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
