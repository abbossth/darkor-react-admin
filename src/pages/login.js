import React, { useState } from "react";
import Logo from "../assets/images/logo-darkor-removebg.png";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!username.length || !password.length) return;
    try {
      const res = await axios.post(
        "/admins/auth/sign-in",
        JSON.stringify({
          phone: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", res, res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner dr-login-container">
          <div class="card">
            <div class="card-body">
              <div class="app-brand justify-content-center">
                <a href="index.html" class="app-brand-link gap-2">
                  <span class="app-brand-logo demo">
                    <img src={Logo} alt="logo" width="100" />
                  </span>
                  <span class="app-brand-text demo text-body fw-bolder text-uppercase">
                    Darkor
                  </span>
                </a>
              </div>
              <p class="mb-4">
                Please sign-in to your account in order to access admin panel.
              </p>

              <form
                id="formAuthentication"
                class="mb-3"
                action="/"
                method="GET"
              >
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    autofocus=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">
                      Password
                    </label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      name="password"
                      placeholder="············"
                      aria-describedby="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span class="input-group-text cursor-pointer">
                      <i class="bx bx-hide"></i>
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="remember-me"
                    />
                    <label class="form-check-label" for="remember-me">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div class="mb-3">
                  <button
                    onClick={handleSignIn}
                    class="btn btn-primary d-grid w-100"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p class="text-center">
                <span>New on our platform?</span>
                <Link to="/products">
                  <span>Create an account</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
