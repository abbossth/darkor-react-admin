import React from "react";
import {
  AddCategoryModal,
  EditCategoryModal,
  DeleteCategoryModal,
} from "../components/CategoryModals";
import { EditProductModal } from "../components/ProductModals";

const Categories = () => {
  return (
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="row py-3">
        <div class="col">
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModal"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
      <div class="card">
        <h5 class="card-header">Categories</h5>
        <div class="table-responsive text-nowrap">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr>
                <td>
                  <i class="fab fa-angular fa-lg text-danger me-3"></i>1
                </td>
                <td>Ichimliklar</td>
                <td>
                  <img
                    width="75"
                    src="https://149520306.v2.pressablecdn.com/wp-content/uploads/2022/02/soft-drink.jpg"
                    alt="drinks"
                  />
                </td>
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
                        data-bs-target="#editCategoryModal"
                      >
                        <i class="bx bx-edit-alt me-1"></i> Edit
                      </button>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteCategoryModal"
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
                <td>Mevalar</td>
                <td>
                  <img
                    width="75"
                    src="https://media.philstar.com/photos/2021/12/02/fruit_2021-12-02_18-19-04.jpg"
                    alt="mevalar"
                  />
                </td>
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
                        data-bs-target="#editCategoryModal"
                      >
                        <i class="bx bx-edit-alt me-1"></i> Edit
                      </button>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteCategoryModal"
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
                <td>Shirinliklar</td>
                <td>
                  <img
                    width="75"
                    src="https://media.licdn.com/dms/image/D5612AQH7aEnghp799w/article-cover_image-shrink_720_1280/0/1681189867209?e=2147483647&v=beta&t=B4TVBnoaawY_LBA864_wjM9_8ea9hzJ6YGC6OxcasG4"
                    alt="candies"
                  />
                </td>
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
                        data-bs-target="#editCategoryModal"
                      >
                        <i class="bx bx-edit-alt me-1"></i> Edit
                      </button>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteCategoryModal"
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
      <AddCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />
    </div>
  );
};

export default Categories;
