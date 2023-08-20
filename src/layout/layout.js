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
        const res = await axios.get("/api/v1/admins/get/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.log(`AccessToken is not Valid ${err}`);
        removeCookies("accessToken");
        navigate("/login");
      }
    };

    checkTokenValid();
  }, []);

  return (
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <AsideMenu />
        <div class="layout-page">
          <NavbarTop />
          <div class="content-wrapper">
            <Outlet />
          </div>
          <Footer />
          <div class="content-backdrop fade"></div>
        </div>
      </div>
      <div
        onClick={() => htmlTag.classList.remove("layout-menu-expanded")}
        class="layout-overlay layout-menu-toggle"
      ></div>
      <div class="drag-target"></div>
    </div>
  );
};

export default Layout;
