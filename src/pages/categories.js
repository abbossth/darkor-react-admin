import React, { useEffect, useState } from "react";
import {
  AddCategoryModal,
  EditCategoryModal,
  DeleteCategoryModal,
} from "../components/CategoryModals";
import axios from "../api/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/category`);
      setCategories(res?.data?.data?.data?.categories);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryId]);

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
        <div className="card-header row">
          <h5 class="col">Categories</h5>
          <div class="col d-flex justify-content-end">
            <button
              className="btn"
              type="button"
              title="Reload"
              onClick={fetchCategories}
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
                <th>ID</th>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {categories.map((c, idx) => {
                return (
                  <tr key={c._id}>
                    <td>{idx + 1}</td>
                    <td>{c.name}</td>
                    <td>
                      <img
                        width="75"
                        src={`${
                          c.image.includes("http")
                            ? c.image
                            : "https://149520306.v2.pressablecdn.com/wp-content/uploads/2022/02/soft-drink.jpg"
                        }`}
                        alt={`${c.name}`}
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
                            onClick={() => setCategoryId(c._id)}
                          >
                            <i class="bx bx-edit-alt me-1"></i> Edit
                          </button>
                          <button
                            onClick={() => setCategoryId(c._id)}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AddCategoryModal />
      <EditCategoryModal id={categoryId} />
      <DeleteCategoryModal id={categoryId} />
    </div>
  );
};

export default Categories;
