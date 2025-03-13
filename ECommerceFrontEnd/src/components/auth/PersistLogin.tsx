import CookieService from "@/services/CookieService";
import { Navigate, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const token = CookieService.get("token");
  return !token ? <Outlet /> : <Navigate to={"/"} />;
};

export default PersistLogin;
