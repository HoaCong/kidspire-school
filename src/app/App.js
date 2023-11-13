import ToastSnackbar from "components/common/ToastSnackbar";
import CheckTokenMiddleware from "middleware/checkToken";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { adminRoutes, publicRoutes, userRoutes } from "router";
import "./index.scss";

function App() {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const listRouter = useCallback(() => {
    const adminMenu = [...publicRoutes, ...adminRoutes];
    const userMenu = [...publicRoutes, ...userRoutes];
    const EnumRoutes = {
      1: adminMenu,
      2: adminMenu,
      3: userMenu,
    };
    return EnumRoutes[user?.roleid] || EnumRoutes[3];
  }, [user?.roleid]);

  const renderRoutes = useCallback((routes) => {
    return routes.map((route, index) => {
      if (route.children?.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      if (route.isRoot) {
        return <Route index element={route.element} key={index} />;
      }

      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, []);

  return (
    <>
      <CheckTokenMiddleware>
        <Routes>{renderRoutes(listRouter())}</Routes>
      </CheckTokenMiddleware>
      <ToastSnackbar />
    </>
  );
}

export default App;
