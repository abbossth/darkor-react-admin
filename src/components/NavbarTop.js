import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { getCookies, removeCookies } from "../hooks/useCookies";
import { useNavigate } from "react-router-dom";

const NavbarTop = () => {
  const navigate = useNavigate();
  const htmlTag = document.getElementById("html");
  const [searchString, setSearchString] = useState("");
  const accessToken = getCookies("accessToken");
  const [profile, setProfile] = useState({ fullName: "", phone: "" });

  const fetchSearchProduct = async () => {
    if (!searchString) return;
    try {
      const res = await axios.get(
        `/api/v1/product/search?search=${searchString}`
      );
      console.log("search", res);
    } catch (err) {
      console.log(`Error in Search Products: ${err}`);
    }
  };

  useEffect(() => {
    fetchSearchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const handleLogOut = () => {
    if (window.confirm("Are you really want to log out?")) {
      removeCookies("accessToken");
      navigate("/login", { replace: true });
    } else {
      return;
    }
  };

  useEffect(() => {
    const getAdminProfile = async () => {
      try {
        const res = await axios.get("/api/v1/admins/get/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setProfile(res?.data?.data);
      } catch (err) {
        console.log(`AccessToken is not Valid ${err}`);
        removeCookies("accessToken");
        navigate("/login");
      }
    };

    getAdminProfile();
  }, [accessToken, navigate]);

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <span
          onClick={() => htmlTag.classList.add("layout-menu-expanded")}
          className="nav-item nav-link px-0 me-xl-4"
        >
          <i className="bx bx-menu bx-sm"></i>
        </span>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <i className="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Поиск..."
              aria-label="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item lh-1 me-3">
            <span></span>
          </li>

          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <span
              className="nav-link dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="avatar avatar-online">
                <img
                  src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                  alt=""
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </span>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <span className="dropdown-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">
                        {profile.fullName}
                      </span>
                      <small className="text-muted">Admin</small>
                    </div>
                  </div>
                </span>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <span
                  className="dropdown-item cursor-pointer"
                  onClick={handleLogOut}
                >
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarTop;
