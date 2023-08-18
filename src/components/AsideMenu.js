import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo-darkor-removebg.png";

const AsideMenu = () => {
  const location = useLocation();
  const htmlTag = document.getElementById("html");
  return (
    <aside
      id="layout-menu"
      class="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div class="app-brand demo">
        <Link to="/" class="app-brand-link">
          <span class="app-brand-logo demo">
            <img src={Logo} class="h-auto" width="50" alt="logo" />
          </span>
          <span class="app-brand-text demo menu-text text-capitalize fw-bold ms-2">
            Darkor
          </span>
        </Link>
        <span
          onClick={() => htmlTag.classList.remove("layout-menu-expanded")}
          class="layout-menu-toggle menu-link text-large ms-auto"
        >
          <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </span>
      </div>
      <div class="menu-inner-shadow"></div>
      <ul class="menu-inner py-1">
        <li class={`menu-item ${location.pathname === "/" ? "active" : ""}`}>
          {/* active*/}
          <Link to={"/"} class="menu-link">
            <i class="menu-icon tf-icons bx bx-home-circle"></i>
            <div>Products</div>
          </Link>
        </li>
        <li
          class={`menu-item ${
            location.pathname === "/categories" ? "active" : ""
          }`}
        >
          <Link to={"/categories"} class="menu-link">
            <i class="menu-icon tf-icons bx bx-detail"></i>
            <div>Categories</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AsideMenu;
