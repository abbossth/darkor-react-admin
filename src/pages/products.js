import React, { useEffect, useState } from "react";
import {
  AddProductModal,
  DeleteProductModal,
  EditProductModal,
} from "../components/ProductModals";
import axios from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/product`);
      setProducts(res?.data?.data?.data?.filteredData);
    } catch (err) {
      console.log(`Error in fetching product: ${err}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="row py-3">
        <div class="col">
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addProductModal"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
      <div class="card">
        <div className="card-header row">
          <h5 class="col">Products</h5>
          <div class="col d-flex justify-content-end">
            <button
              className="btn"
              type="button"
              title="Reload"
              onClick={fetchProducts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="table-responsive text-nowrap">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>SIZE</th>
                <th>COLOR</th>
                <th>DESCRIPTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {products.map((p, idx) => {
                console.log(p);
                return (
                  <tr key={p._id}>
                    <td>{idx + 1}</td>
                    <td>{p.title}</td>
                    <td>
                      <img
                        width="75"
                        src={
                          p.image?.includes("http")
                            ? p.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNf0nvvXE7AVsg2EiONsgZoJS779DTMi89zw&usqp=CAU"
                        }
                        alt="coke"
                      />
                    </td>
                    <td>{p.price} UZS</td>
                    <td>
                      <span class="badge bg-label-primary me-1">
                        {p?.categoryId?.name}
                      </span>
                    </td>
                    <td>
                      {p.size?.map((s, idx) => (
                        <div key={idx} class="badge bg-label-warning me-1">
                          {s}
                        </div>
                      ))}
                    </td>
                    <td>
                      {p.color?.map((c, idx) => (
                        <div key={idx} class="badge bg-label-info me-1">
                          {c}
                        </div>
                      ))}
                    </td>
                    <td>{p.description}</td>
                    <td>
                      <div class="dropdown">
                        <button
                          type="button"
                          class="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                          <button
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#editProductModal"
                            onClick={() => setProductId(p._id)}
                          >
                            <i class="bx bx-edit-alt me-1"></i> Edit
                          </button>
                          <button
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteProductModal"
                            onClick={() => setProductId(p._id)}
                          >
                            <i class="bx bx-trash me-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AddProductModal />
      <EditProductModal id={productId} />
      <DeleteProductModal id={productId} />
    </div>
  );
};

export default Products;
