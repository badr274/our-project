import CookieService from "@/services/CookieService";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = CookieService.get("token");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
