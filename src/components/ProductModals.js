import { useEffect, useState } from "react";
import axios from "../api/axios";

export const AddProductModal = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!e.target.files[0]) {
      setImage(image);
      return;
    }
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`/upload`, formData);
      setImage(res?.data?.data?.data?.url);
    } catch (err) {
      console.log(`Error in image upload ${err}`);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/api/v1/category`);
      setCategories(res?.data?.data?.data?.categories);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const productData = {
    name: title,
    title,
    categoryId,
    price,
    size: [size],
    color: [color],
    description,
    image,
  };

  const handleCreateProduct = async () => {
    try {
      const res = await axios.post(
        `/api/v1/product`,
        JSON.stringify(productData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res) {
        setTitle("");
        setPrice(0);
        setColor("");
        setSize("");
        setDescription("");
        setImage("");
        setFile(null);
        setCategoryId("");
      }
    } catch (error) {
      console.log(`Error in product ${error}`);
    }
  };

  return (
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">
              Добавить Товар
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
                  placeholder="TERRA PRO | Fultbolka ..."
                  aria-describedby="defaultFormControlHelp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="largeSelect" class="form-label">
                  Категория
                </label>
                <select
                  id="largeSelect"
                  class="form-select form-select"
                  value={"default"}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value={"default"}>Выберите Категорию</option>
                  {categories?.map((c) => (
                    <option value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Цена
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="85,000"
                  aria-describedby="defaultFormControlHelp"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Размер
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="53, XL"
                  aria-describedby="defaultFormControlHelp"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Цвет
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="Черный,..."
                  aria-describedby="defaultFormControlHelp"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Описание (Необязательно)
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Этот товар..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Загрузить Изобрежание
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
              onClick={handleCreateProduct}
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addProductModal"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditProductModal = ({ id }) => {
  const productData = {
    name: "",
    title: "",
    categoryId: { _id: null, name: "No Category" },
    price: 0,
    size: "",
    color: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1598373182308-3270495d2f58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9hZiUyMG9mJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  };

  const [product, setProduct] = useState(productData);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!e.target.files[0]) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`/upload`, formData);
      setProduct({ ...product, image: res?.data?.data?.data?.url });
    } catch (err) {
      console.log(`Error in image upload ${err}`);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/product/${id}`);
      setProduct(res?.data?.data?.data?.product);
    } catch (err) {
      console.log(`Error in fetching product with id (${id}) - ${err}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/api/v1/category`);
      setCategories(res?.data?.data?.data?.categories);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
    }
  };

  const handleEditProduct = async () => {
    try {
      const res = await axios.patch(`/api/v1/product/${id}`, {
        title: product.title,
        name: product.title,
        categoryId: product.categoryId._id,
        price: product.price,
        size: product.size,
        color: product.color,
        description: product.description,
        image: product.image,
      });
    } catch (err) {
      console.log(`Error in editing product ${err}`);
    }
  };

  useEffect(() => {
    if (file) uploadImage();
  }, [file]);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (id) fetchCategories();
  }, [id]);

  return (
    <div
      class="modal fade"
      id="editProductModal"
      tabindex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductModalLabel">
              Редактировать Товар
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
                  placeholder="Banan.."
                  aria-describedby="defaultFormControlHelp"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="largeSelect" class="form-label">
                  Категория
                </label>
                <select
                  id="largeSelect"
                  class="form-select form-select"
                  value={product?.categoryId?._id}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      categoryId: {
                        ...product.categoryId,
                        _id: e.target.value,
                      },
                    })
                  }
                >
                  <option value={null}>Выберите Категорию</option>
                  {categories?.map((c) => (
                    <option value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Цена
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="15,000"
                  aria-describedby="defaultFormControlHelp"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Размер
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="XL, M, 15, .."
                  aria-describedby="defaultFormControlHelp"
                  value={product.size}
                  onChange={(e) =>
                    setProduct({ ...product, size: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Цвет
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="Black..."
                  aria-describedby="defaultFormControlHelp"
                  value={product.color}
                  onChange={(e) =>
                    setProduct({ ...product, color: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Описание (Необязательно)
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Bu mahsulotimiz..."
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Загрузить Изобрежание
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                />
              </div>
              {product?.image?.length ? (
                <div class="mb-3">
                  <img
                    src={`${product.image}`}
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
              Отмена
            </button>
            <button
              onClick={handleEditProduct}
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#editProductModal"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeleteProductModal = ({ id }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/product/${id}`);
    } catch (error) {
      console.log(`Error in deleting category ${error}`);
    }
  };

  return (
    <div
      class="modal fade"
      id="deleteProductModal"
      tabindex="-1"
      aria-labelledby="deleteProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteProductModalLabel">
              <div class="alert">
                Вы уверены, что хотите удалить этот продукт?
              </div>
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
              Отмена
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={handleDelete}
              data-bs-toggle="modal"
              data-bs-target="#deleteProductModal"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
