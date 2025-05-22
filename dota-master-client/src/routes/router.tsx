import { createBrowserRouter } from "react-router-dom";
import { Welcome } from "../pages/welcome";
import { Layout } from "@src/shared/ui/layout";
import { Profile } from "@src/pages/profile";
import { Matches } from "@src/pages/matches";
import { MatchAnalysisPage } from "@src/pages/match-analysis";

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
        element: <Matches />,
      },
      {
        path: "match-analysis/:id",
        element: <MatchAnalysisPage />,
      },
    ],
  },
]);

export default router;
