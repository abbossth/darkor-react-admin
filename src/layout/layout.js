import { Outlet, useNavigate } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";
import NavbarTop from "../components/NavbarTop";
import Footer from "../components/footer";
import { getCookies, removeCookies } from "../hooks/useCookies";
import { useEffect } from "react";
import axios from "../api/axios";

const Layout = () => {
  const htmlTag = document.getElementById("html");
  const navigate = useNavigate();
  const accessToken = getCookies("accessToken");

  useEffect(() => {
    const checkTokenValid = async () => {
      try {
        await axios.get("/api/v1/admins/get/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          removeCookies("accessToken");
          navigate("/login");
        }
        console.log(`Unhandled Error while fetching admin me ${err}`);
      }
    };

    checkTokenValid();
  }, [accessToken, navigate]);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AsideMenu />
        <div className="layout-page">
          <NavbarTop />
          <div className="content-wrapper">
            <Outlet />
          </div>
          <Footer />
          <div className="content-backdrop fade"></div>
        </div>
      </div>
      <div
        onClick={() => htmlTag.classList.remove("layout-menu-expanded")}
        className="layout-overlay layout-menu-toggle"
      ></div>
      <div className="drag-target"></div>
    </div>
  );
};

export default Layout;
