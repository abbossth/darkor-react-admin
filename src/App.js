import "./assets/css/core.css";
import "./assets/css/demo.css";
import "./assets/css/theme-default.css";
import "./assets/css/custom.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./pages/login";
import Products from "./pages/products";
import Categories from "./pages/categories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Products />}></Route>
          <Route path="categories" element={<Categories />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
