import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const NavbarTop = () => {
  const htmlTag = document.getElementById("html");
  const [searchString, setSearchString] = useState("");

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
  }, [searchString]);

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
              placeholder="Search..."
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
                <a class="dropdown-item" href="#">
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
                      <span class="fw-semibold d-block">John Doe</span>
                      <small class="text-muted">Admin</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div class="dropdown-divider"></div>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <i class="bx bx-user me-2"></i>
                  <span class="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <i class="bx bx-cog me-2"></i>
                  <span class="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <span class="d-flex align-items-center align-middle">
                    <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                    <span class="flex-grow-1 align-middle">Billing</span>
                    <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                      4
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <div class="dropdown-divider"></div>
              </li>
              <li>
                <Link class="dropdown-item" to="/login">
                  <i class="bx bx-power-off me-2"></i>
                  <span class="align-middle">Log Out</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarTop;
