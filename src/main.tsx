import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import "./styles/index.css";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MangaCardContainer } from "./routes/MangaCardContainer";
import { MangaPage } from "./routes/MangaPage";
import { SusPage } from "./routes/SusPage";
import { LandingPage } from "./routes/LandingPage";
import { MangaReader } from "./routes/MangaReader";
import { FavouriteMangaCardContainer } from "./routes/FavouriteMangaCardContainer";
import App from "./App";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "mangalist/:orderType",
        element: <MangaCardContainer />,
      },
      {
        path: "search/:searchValue",
        element: <MangaCardContainer />,
      },
      {
        path: "favourites/",
        element: <FavouriteMangaCardContainer />,
      },
      {
        path: "manga/:mangaId",
        element: <MangaPage />,
      },
      {
        path: "manga/chapter/:chapterId",
        element: <MangaReader />,
      },
      {
        path: "suspage/",
        element: <SusPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
