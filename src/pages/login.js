import React, { useState } from "react";
import Logo from "../assets/images/logo-darkor-removebg.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getCookies, setCookies } from "../hooks/useCookies";
import Toast from "../components/toast";
import ReactInputMask from "react-input-mask";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = getCookies("accessToken") || "";
  const [toggle, setToggle] = useState(false);
  const [toastData, setToastData] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("bx-hide");

  if (accessToken.length) {
    return <Navigate to={from} replace />;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/v1/admins/auth/sign-in",
        JSON.stringify({
          phone: `${username[1]}${username[2]}${username[5]}${username[6]}${username[7]}${username[9]}${username[10]}${username[12]}${username[13]}`,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCookies("accessToken", res?.data?.data?.token);
      clearForm();
      setLoading(false);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response?.data?.success) {
        setToggle(true);
        if (error?.response?.data?.data?.[0]?.msg) {
          setToastData(error?.response?.data?.data?.[0]?.msg);
        } else {
          setToastData(error?.response?.data?.error?.message);
        }
      } else {
        console.log(`Unhandled Error ${error}`);
      }
      setLoading(false);
    }
  };

  const clearForm = () => {
    setPassword("");
    setUsername("");
  };

  const handlePasswordIconToggle = () => {
    if (type === "password") {
      setIcon("bx-show");
      setType("text");
    } else {
      setIcon("bx-hide");
      setType("password");
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner dr-login-container">
          <div className="card dr-login-card">
            <div className="card-body">
              <div
                className="app-brand justify-content-center"
                id="liveToastBtn"
                onClick={() => setToggle(true)}
              >
                <div className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    <img src={Logo} alt="logo" width="100" />
                  </span>
                  <span className="app-brand-text demo text-body fw-bolder text-uppercase">
                    Darkor
                  </span>
                </div>
              </div>
              {/* <p className="mb-4">
                Please sign-in to your account in order to access admin panel.
              </p> */}

              <form
                id="formAuthentication"
                className="mb-3"
                action="/"
                method="GET"
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Phone Number
                  </label>
                  <ReactInputMask
                    mask="(99) 999-99-99"
                    maskChar={"_"}
                    type="text"
                    className="form-control"
                    id="username"
                    alwaysShowMask="true"
                    placeholder="Telefon raqamingizni kiriting..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div>
                      <small
                        className="text-primary cursor-pointer"
                        onClick={() => {
                          setToastData("Call to our Adminstrators");
                          setToggle(true);
                        }}
                      >
                        Forgot Password?
                      </small>
                    </div>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type={type}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="············"
                      aria-describedby="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={handlePasswordIconToggle}
                    >
                      <i className={`bx ${icon}`}></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                    />
                    <label className="form-check-label" htmlFor="remember-me">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    onClick={handleSignIn}
                    className="btn btn-primary d-flex justify-content-center align-items-center w-100"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="fw-bold me-2">Kirish</span>
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                  </button>
                </div>
              </form>
              {/* 
              <p className="text-center">
                <span>New on our platform?</span>
                <Link to="/products">
                  <span>Create an account</span>
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <Toast toggle={toggle} setToggle={setToggle} data={toastData} />
    </div>
  );
};

export default Login;
