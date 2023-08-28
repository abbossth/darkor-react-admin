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
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <span
          onClick={() => htmlTag.classList.add("layout-menu-expanded")}
          class="nav-item nav-link px-0 me-xl-4"
        >
          <i class="bx bx-menu bx-sm"></i>
        </span>
      </div>

      <div
        class="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div class="navbar-nav align-items-center">
          <div class="nav-item d-flex align-items-center">
            <i class="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              class="form-control border-0 shadow-none"
              placeholder="Поиск..."
              aria-label="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </div>

        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <li class="nav-item lh-1 me-3">
            <span></span>
          </li>

          <li class="nav-item navbar-dropdown dropdown-user dropdown">
            <span
              class="nav-link dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="avatar avatar-online">
                <img
                  src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                  alt=""
                  class="w-px-40 h-auto rounded-circle"
                />
              </div>
            </span>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <span class="dropdown-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar avatar-online">
                        <img
                          src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                          alt=""
                          class="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <span class="fw-semibold d-block">
                        {profile.fullName}
                      </span>
                      <small class="text-muted">Admin</small>
                    </div>
                  </div>
                </span>
              </li>
              <li>
                <div class="dropdown-divider"></div>
              </li>
              <li>
                <span
                  class="dropdown-item cursor-pointer"
                  onClick={handleLogOut}
                >
                  <i class="bx bx-power-off me-2"></i>
                  <span class="align-middle">Log Out</span>
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
