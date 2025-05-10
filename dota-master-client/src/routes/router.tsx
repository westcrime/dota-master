import { createBrowserRouter } from "react-router-dom";
import { Welcome } from "../components/welcome";
import { Layout } from "@src/components/layout";
import { Profile } from "@src/components/profile";

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
        path: 'profile',
        element: <Profile />,
      },
      {
        path: "matches",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
