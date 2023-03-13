import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./routes/Header";
import ErrorPage from "./routes/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MangaCardContainer } from "./routes/MangaCardContainer";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mangalist/:orderType",
        element: <MangaCardContainer />,
        children: [{ path: "anime/:anime", element: <MangaCardContainer /> }],
      },
      // {
      //   path: "anime/",
      //   element: <MangaCardContainer />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
