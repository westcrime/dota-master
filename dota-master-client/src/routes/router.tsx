import { createBrowserRouter } from "react-router-dom";
import { Welcome } from "../components/welcome";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />
  },
]);

export default router;
