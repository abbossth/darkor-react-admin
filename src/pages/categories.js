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

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/category`);
      setCategories(res?.data?.data?.data?.categories);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
    }
  };

  const handleCreateCategory = async (name) => {
    if (!name) return;
    try {
      await axios.post(
        "/category",
        JSON.stringify({
          name: name,
          image:
            "https://img.freepik.com/free-vector/successful-business-man-holding-trophy_1150-35042.jpg?w=1380&t=st=1692387687~exp=1692388287~hmac=f64a0bc53bfb98879c8ed78677ef8297f6733542c0315adfc489af06e53f513f",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(`Error in Creating Category: ${err}`);
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
      <AddCategoryModal handleCreateCategory={handleCreateCategory} />
      <EditCategoryModal id={categoryId} />
      <DeleteCategoryModal id={categoryId} />
    </div>
  );
};

export default Categories;
