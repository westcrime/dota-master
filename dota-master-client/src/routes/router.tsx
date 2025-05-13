import { createBrowserRouter } from "react-router-dom";
import { Welcome } from "../pages/welcome";
import { MatchHistoryCard } from "@pages/matches";
import { Layout } from "@src/shared/ui/layout";
import { Profile } from "@src/pages/profile";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "matches",
        element: <MatchHistoryCard />,
      },
    ],
  },
]);

export default router;
