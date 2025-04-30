import AuthDialog from "@/components/AuthDialog";
import { MyFooter } from "@/components/MyFooter";
import { Navbar1 } from "@/components/Navbar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling
  }, [pathname]);
  return (
    <div>
      <Navbar1 />
      <Outlet />
      <AuthDialog />
      <MyFooter />
    </div>
  );
};

export default AppLayout;
