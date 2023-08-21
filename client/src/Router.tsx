import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import StartGame from "./Pages/StartGame/StartGame";
import Game from "./Pages/Game/Game";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <StartGame /> },
        { path: "/leaderboard", element: <Leaderboard /> },
        { path: "game/:canvasName", element: <Game /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
