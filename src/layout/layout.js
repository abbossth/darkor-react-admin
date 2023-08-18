import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";
import NavbarTop from "../components/NavbarTop";
import Footer from "../components/footer";

const Layout = () => {
  const htmlTag = document.getElementById("html");
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
