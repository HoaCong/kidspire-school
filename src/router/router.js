import Layout from "components/layout";
import { ROUTES } from "constants/routerWeb";
import Dashboard from "pages/dashboard";
import NotFoundPage from "pages/notFoundPage";
import CreUpUser from "pages/users/CreUpUser";

export const routers = [
  //   { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
  {
    path: ROUTES.HOME_PAGE,
    name: "Layout",
    element: <Layout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <Dashboard /> },
      {
        path: ROUTES.DASHBOARD,
        name: "Dashboard Page",
        element: <Dashboard />,
      },
      { path: ROUTES.ADD_USER, name: "Add User", element: <CreUpUser /> },
      {
        path: ROUTES.UPDATE_USER,
        name: "Update User",
        element: <CreUpUser />,
      },
      { path: "*", name: "Not Found Page", element: <NotFoundPage /> },
    ],
  },
];
