/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const checkTimeExpired = (timeExpired) => {
  const now = new Date().getTime();
  return now > timeExpired;
};

const CheckTokenMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    data: { access_token, timeExpired },
  } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    if (!access_token || (access_token && checkTimeExpired(timeExpired))) {
      if (pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) return;
      return navigate(ROUTES.LOGIN);
    } else {
      if (pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER)
        return navigate("/");
    }
  }, [access_token, pathname]);

  return children;
};

export default CheckTokenMiddleware;
