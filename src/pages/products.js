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
        <h5 class="card-header">Products</h5>
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
