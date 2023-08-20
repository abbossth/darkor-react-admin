import { useEffect, useState } from "react";
import axios from "../api/axios";

export const AddCategoryModal = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!e.target.files[0]) {
      setImage("");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await axios.post(`/upload`, formData);
      setImage(res?.data?.data?.data?.url);
      console.log("image", res?.data?.data?.data?.url);
    } catch (err) {
      console.log(`Error in image upload ${err}`);
    }
  };

  const handleCreateCategory = async () => {
    if (!name.length || !image.length) return;
    try {
      await axios.post(
        "/api/v1/category",
        JSON.stringify({
          name,
          image,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setImage("");
      setName("");
    } catch (err) {
      console.log(`Error in Creating Category: ${err}`);
    }
  };

  return (
    <div
      class="modal fade"
      id="addCategoryModal"
      tabindex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategoryModalLabel">
              Добавить Категорию
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="">
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Заголовок
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="Напитки"
                  aria-describedby="defaultFormControlHelp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Загрузить Изобрежение
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                />
              </div>
              {image.length ? (
                <div class="mb-3">
                  <img src={`${image}`} alt="uploaded image" width={200} />
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-start">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              onClick={() => handleCreateCategory(name)}
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModal"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditCategoryModal = ({ id }) => {
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`/api/v1/category/${id}`);
      // console.log("cat", res?.data?.data?.data?.category);
      setCategory(res?.data?.data?.data?.category);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!e.target.files[0]) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await axios.post(`/upload`, formData);
      setCategory({ ...category, image: res?.data?.data?.data?.url });
      console.log("image", res?.data?.data?.data?.url);
    } catch (err) {
      console.log(`Error in image upload ${err}`);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const res = await axios.patch(`/api/v1/category/${id}`, category);
      console.log("res", res?.data);
    } catch (err) {
      console.log(`Error in update category ${err}`);
    }
  };

  console.log("c", category);

  return (
    <div
      class="modal fade"
      id="editCategoryModal"
      tabindex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCategoryModalLabel">
              Update Category
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="">
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                  value={category?.name || ""}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label
                  for="formFile"
                  class="form-label"
                  onChange={handleImageUpload}
                >
                  Upload Image
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                />
              </div>
              {category?.image.length ? (
                <div class="mb-3">
                  <img
                    src={`${category?.image}`}
                    alt="uploaded image"
                    width={200}
                  />
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-start">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#editCategoryModal"
              onClick={handleUpdateCategory}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeleteCategoryModal = ({ id }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/category/${id}`);
    } catch (error) {
      console.log(`Error in deleting category ${error}`);
    }
  };

  return (
    <div
      class="modal fade"
      id="deleteCategoryModal"
      tabindex="-1"
      aria-labelledby="deleteCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteCategoryModalLabel">
              <div class="alert">Are you sure to delete this category?</div>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer d-flex justify-content-start">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={handleDelete}
              data-bs-toggle="modal"
              data-bs-target="#deleteCategoryModal"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
