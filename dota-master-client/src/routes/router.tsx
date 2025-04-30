import { createBrowserRouter } from "react-router-dom";
import { Welcome } from "../components/welcome";
import { Layout } from "@src/components/layout";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />
  },
  {
    path: "/",
    element: <Layout />
  },
]);

export default router;
