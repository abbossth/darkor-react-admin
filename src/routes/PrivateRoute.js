import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookies } from "../hooks/useCookies";

const PrivateRoute = () => {
  const accessToken = getCookies("accessToken");
    const location = useLocation();
  if (!accessToken)
    return <Navigate to={"/login"} state={{ from: location }} replace />;


  return <Outlet />;
};

export default PrivateRoute;
