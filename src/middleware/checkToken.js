/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CheckTokenMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    data: { access_token },
  } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    if (!access_token) {
      if (pathname === ROUTES.LOGIN) return;
      return navigate(ROUTES.LOGIN);
    } else {
      if (pathname === ROUTES.LOGIN) return navigate("/");
    }
  }, [access_token, pathname]);

  return children;
};

export default CheckTokenMiddleware;
