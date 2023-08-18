import React from "react";
import {
  AddProductModal,
  DeleteProductModal,
  EditProductModal,
} from "../components/ProductModals";

const Products = () => {
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
                <th>ID</th>
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
              <tr>
                <td>
                  <i class="fab fa-angular fa-lg text-danger me-3"></i>1
                </td>
                <td>Coca Cola</td>
                <td>
                  <img
                    width="75"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNf0nvvXE7AVsg2EiONsgZoJS779DTMi89zw&usqp=CAU"
                    alt="coke"
                  />
                </td>
                <td>15,000 UZS</td>
                <td>
                  <span class="badge bg-label-primary me-1">ICHIMLIKLAR</span>
                </td>
                <td>XS, S, M, L</td>
                <td>Black</td>
                <td>Lorem ipsum dolar sit amor, anorim aside...</td>
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
                      >
                        <i class="bx bx-edit-alt me-1"></i> Edit
                      </button>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
                      >
                        <i class="bx bx-trash me-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fab fa-angular fa-lg text-danger me-3"></i>2
                </td>
                <td>Snickers</td>
                <td>
                  <img
                    width="75"
                    src="https://www.candywarehouse.com/cdn/shop/files/snickers-candy-bars-48-piece-box-candy-warehouse-1.jpg?v=1689311063"
                    alt="snickers"
                  />
                </td>
                <td>8,000 UZS</td>
                <td>
                  <span class="badge bg-label-warning me-1">Shirinliklar</span>
                </td>
                <td>M, L, LG</td>
                <td>Red</td>
                <td>Lorem ipsum dolar sit amor, anorim aside...</td>
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
                      >
                        <i class="bx bx-edit-alt me-1"></i> Edit
                      </button>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
                      >
                        <i class="bx bx-trash me-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fab fa-angular fa-lg text-danger me-3"></i>3
                </td>
                <td>Banana</td>
                <td>
                  <img
                    width="75"
                    src="https://www.tazaonline.com/wp-content/uploads/2020/04/banana-1.jpg"
                    alt="banana"
                  />
                </td>
                <td>21,000 UZS</td>
                <td>
                  <span class="badge bg-label-success me-1">MEVALAR</span>
                </td>
                <td>M, L</td>
                <td>Blue</td>
                <td>Lorem ipsum dolar sit amor, anorim aside...</td>
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
                      >
                        <i class="bx bx-edit-alt me-1"></i> Edit
                      </button>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
                      >
                        <i class="bx bx-trash me-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddProductModal />
      <EditProductModal />
      <DeleteProductModal />
    </div>
  );
};

export default Products;
