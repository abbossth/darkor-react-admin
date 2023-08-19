import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookies } from "../hooks/useCookies";
import axios from "../api/axios";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const accessToken = getCookies("accessToken");
    const location = useLocation();
  //   const [isTokenFake, setIsTokenFake] = useState(false);

  //   if (!accessToken) {
  //     setIsTokenFake(true);
  //   }
  if (!accessToken)
    return <Navigate to={"/login"} state={{ from: location }} replace />;


  return <Outlet />;
};

export default PrivateRoute;
