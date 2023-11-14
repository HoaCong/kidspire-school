import AdminLayout from "components/layout/AdminLayout";
import UserLayout from "components/layout/UserLayout";
import { ROUTES } from "constants/routerWeb";
import Category from "pages/Category";
import Dashboard from "pages/Dashboard";
import HomePage from "pages/HomePage";
import Lesson from "pages/Lesson";
import Login from "pages/Login";
import PageNotFound from "pages/NotFoundPage";
import Register from "pages/Register";
import Topic from "pages/Topic";
import Users from "pages/User";
import CreUpUser from "pages/User/CreUpUser";

export const EnumHome = {
  1: ROUTES.ADMIN_HOME_PAGE,
  2: ROUTES.ADMIN_HOME_PAGE,
  3: ROUTES.HOME_PAGE,
};

export const adminRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <Dashboard /> },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        name: "Dashboard Page",
        element: <Dashboard />,
      },
      { path: ROUTES.ADMIN_USER, name: "Users", element: <Users /> },
      { path: ROUTES.ADMIN_ADD_USER, name: "Add User", element: <CreUpUser /> },
      {
        path: ROUTES.ADMIN_UPDATE_USER,
        name: "Update User",
        element: <CreUpUser />,
      },
      {
        path: ROUTES.ADMIN_TOPIC,
        name: "Topic",
        element: <Topic />,
      },
      {
        path: ROUTES.ADMIN_CATEGORY,
        name: "Category",
        element: <Category />,
      },
      {
        path: ROUTES.ADMIN_LESSON,
        name: "Category",
        element: <Lesson />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const userRoutes = [
  {
    path: ROUTES.ADMIN_LESSON,
    name: "Category",
    element: <Lesson />,
  },
];

export const publicRoutes = [
  {
    path: ROUTES.HOME_PAGE,
    name: "User Layout",
    element: <UserLayout />,
    children: [{ isRoot: true, name: "Login Page", element: <HomePage /> }],
  },
  { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
  { path: ROUTES.REGISTER, name: "Register Page", element: <Register /> },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];
