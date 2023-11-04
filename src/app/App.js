import ToastSnackbar from "components/common/ToastSnackbar";
import CheckTokenMiddleware from "middleware/checkToken";
import React, { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "router";
import "./index.scss";

function App() {
  const renderRoutes = useCallback((publicRoutes) => {
    return publicRoutes.map((route, index) => {
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
        <Routes>{renderRoutes(publicRoutes)}</Routes>
      </CheckTokenMiddleware>
      <ToastSnackbar />
    </>
  );
}

export default App;
