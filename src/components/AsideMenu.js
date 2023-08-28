import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo-darkor-removebg.png";

const AsideMenu = () => {
  const location = useLocation();
  const htmlTag = document.getElementById("html");
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <Link to="/" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src={Logo} className="h-auto" width="50" alt="logo" />
          </span>
          <span className="app-brand-text demo menu-text text-capitalize fw-bold ms-2">
            Darkor
          </span>
        </Link>
        <span
          onClick={() => htmlTag.classList.remove("layout-menu-expanded")}
          className="layout-menu-toggle menu-link text-large ms-auto"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </span>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        <li
          className={`menu-item ${location.pathname === "/" ? "active" : ""}`}
        >
          {/* active*/}
          <Link to={"/"} className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div>Товары</div>
          </Link>
        </li>
        <li
          className={`menu-item ${
            location.pathname === "/categories" ? "active" : ""
          }`}
        >
          <Link to={"/categories"} className="menu-link">
            <i className="menu-icon tf-icons bx bx-detail"></i>
            <div>Категории</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AsideMenu;
