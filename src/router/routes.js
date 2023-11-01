import Layout from "components/layout";
import { ROUTES } from "constants/routerWeb";
import Category from "pages/Category";
import Dashboard from "pages/Dashboard";
import Lesson from "pages/Lesson";
import Login from "pages/Login";
import NotFoundPage from "pages/NotFoundPage";
import Topic from "pages/Topic";
import Users from "pages/Users";
import CreUpUser from "pages/Users/CreUpUser";

export const publicRoutes = [
  { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
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
      { path: ROUTES.USER, name: "Add User", element: <Users /> },
      { path: ROUTES.ADD_USER, name: "Add User", element: <CreUpUser /> },
      {
        path: ROUTES.UPDATE_USER,
        name: "Update User",
        element: <CreUpUser />,
      },
      {
        path: ROUTES.TOPIC,
        name: "Topic",
        element: <Topic />,
      },
      {
        path: ROUTES.CATEGORY,
        name: "Category",
        element: <Category />,
      },
      {
        path: ROUTES.LESSON,
        name: "Category",
        element: <Lesson />,
      },
      { path: "*", name: "Not Found Page", element: <NotFoundPage /> },
    ],
  },
];