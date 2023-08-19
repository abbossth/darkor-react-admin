import Cookies from "js-cookie";

export const setCookies = (prop, value) => {
  return Cookies.set(prop, value, {
    expires: 5,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export const getCookies = (prop) => {
  return Cookies.get(prop);
};

export const removeCookies = (prop) => {
  return Cookies.remove(prop);
};
