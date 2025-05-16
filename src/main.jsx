import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import axios from "axios";
import { ConfigProvider } from "antd";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import MovieDetailsPage from "./pages/Home/MovieDetailsPage.jsx";
import Home from "./pages/Home/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TVShows from "./pages/TVShows/TVShows.jsx";
import TVShowDetailsPage from "./pages/TVShows/TVShowDetailsPage.jsx";
import AllTVShows from "./pages/TVShows/AllTVShows.jsx";
import AllMovies from "./pages/Home/AllMovies.jsx";

axios.defaults.baseURL = "https://mess-metrics-server.vercel.app/api/v1";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/movies/top-rated" element={<AllMovies type="top-rated" />} />
      <Route path="/movies/popular" element={<AllMovies type="popular" />} />
      <Route path="/tv" element={<TVShows />} />
      <Route path="/tv/popular" element={<AllTVShows type="popular" />} />
      <Route path="/tv/top-rated" element={<AllTVShows type="top-rated" />} />
      <Route path="/tv/:id" element={<TVShowDetailsPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider router={router} />
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
