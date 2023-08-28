import { useEffect, useState } from "react";
import axios from "../api/axios";
import Select from "react-select";
import { sizeOptions } from "../utils/utils";
import Toast from "./toast";

export const AddProductModal = () => {
  const [title, setTitle] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState([
    sizeOptions[5].value,
    sizeOptions[2].value,
  ]);
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toastData, setToastData] = useState("");

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

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/api/v1/category`);
      setCategories(res?.data?.data?.data?.categories);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
    }
  };

  const handleSizeChange = (e) => {
    let sizes = [];
    e.forEach((s) => sizes.push(s.value));
    setSize(sizes);
  };

  const productData = {
    name: title,
    title,
    categoryId,
    price,
    size,
    color: [color],
    description,
    image,
  };

  const handleCreateProduct = async () => {
    setLoading(true);
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
        setCategoryId("");
        setPrice("");
        setSize("");
        setDescription("");
        setImage("");
        setTimeout(() => {
          setTitle(null);
          setCategoryId(null);
          setPrice(null);
          setSize(null);
          setDescription(null);
          setImage(null);
        }, 300);
        setLoading(false);
        setFile(null);
        setTimeout(() => {
          setToggle(true);
          setToastData("Product is successfully added to products list.");
        }, 1000);
      }
      console.log("ddd", res);
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 422) {
        setToggle(true);
        setToastData(
          `${error?.response?.data?.data?.[0].msg} in ${error?.response?.data?.data?.[0].path}`
        );
      }
      console.log(error?.response);
      console.log(`Error in product ${error}`);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div
      className="modal fade"
      id="addProductModal"
      tabIndex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductModalLabel">
              Добавить Товар
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Заголовок <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="TERRA PRO | Fultbolka ..."
                  aria-describedby="defaultFormControlHelp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={(e) => {
                    if (title === null) return setTitle("");
                  }}
                />
                <div
                  id="defaultFormControlHelp"
                  className={`form-text text-danger ${
                    title?.length > 0 || title === null ? "d-none" : ""
                  }`}
                >
                  Title cannot be empty
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="largeSelect" className="form-label">
                  Категория <span className="text-danger">*</span>
                </label>
                <select
                  id="largeSelect"
                  className="form-select form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  onBlur={(e) => {
                    if (categoryId === null) return setCategoryId("");
                  }}
                >
                  <option value={""}>Выберите Категорию</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div
                  id="defaultFormControlHelp"
                  className={`form-text text-danger ${
                    categoryId?.length > 0 || categoryId === null
                      ? "d-none"
                      : ""
                  }`}
                >
                  Category cannot be unselected.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Цена <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="85,000"
                  aria-describedby="defaultFormControlHelp"
                  value={price}
                  pattern="[0-9]*"
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={(e) => {
                    if (price === null) return setPrice("");
                  }}
                />
                <div
                  id="defaultFormControlHelp"
                  className={`form-text text-danger ${
                    price?.length > 0 || price === null ? "d-none" : ""
                  }`}
                >
                  Price cannot be empty
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Размер <span className="text-danger">*</span>
                </label>
                <Select
                  defaultValue={[sizeOptions[1], sizeOptions[4]]}
                  isMulti
                  name="sizes"
                  options={sizeOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSizeChange}
                  onBlur={(e) => {
                    if (size === null) return setSize([]);
                  }}
                />
                <div
                  id="defaultFormControlHelp"
                  className={`form-text text-danger ${
                    size?.length > 0 || size === null ? "d-none" : ""
                  }`}
                >
                  Size cannot be unchosen
                </div>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Цвет
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="Черный,..."
                  aria-describedby="defaultFormControlHelp"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div> */}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Описание <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Этот товар..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Загрузить Изобрежание <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                  onBlur={(e) => {
                    if (image === null) {
                      return setImage("");
                    }
                  }}
                />
                <div
                  id="defaultFormControlHelp"
                  className={`form-text text-danger ${
                    image?.length > 0 || image === null ? "d-none" : ""
                  }`}
                >
                  Image field cannot be empty.
                </div>
              </div>
              {image?.length ? (
                <div className="mb-3">
                  <img src={`${image}`} alt="uploaded" width={200} />
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setTitle("");
                setCategoryId("");
                setPrice("");
                setSize("");
                setDescription("");
                setImage("");
                setTimeout(() => {
                  setTitle(null);
                  setCategoryId(null);
                  setPrice(null);
                  setSize(null);
                  setDescription(null);
                  setImage(null);
                  setFile(null);
                }, 300);
              }}
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              onClick={handleCreateProduct}
              type="button"
              className="btn btn-primary d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              <span className="fw-bold me-2">Создать</span>
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </button>
          </div>
        </div>
      </div>
      <Toast toggle={toggle} setToggle={setToggle} data={toastData} />
    </div>
  );
};

export const EditProductModal = ({ id }) => {
  const [selectDefaultValues, setSelectDefaultValues] = useState([]);
  const productData = {
    name: "",
    title: "",
    categoryId: { _id: null, name: "No Category" },
    price: 0,
    size: [],
    color: "",
    description: "",
    image: "",
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
      await axios.patch(`/api/v1/product/${id}`, {
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

  const handleSizeChange = (e) => {
    let sizes = [];
    e.forEach((s) => sizes.push(s.value));
    setProduct({ ...product, size: sizes });
  };

  useEffect(() => {
    let sizes = [];
    product?.size?.forEach((p) => sizes.push({ value: p, label: p }));
    setSelectDefaultValues(sizes);
  }, [product]);

  useEffect(() => {
    if (file) uploadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (id) fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id) fetchCategories();
  }, [id]);

  return (
    <div
      className="modal fade"
      id="editProductModal"
      tabIndex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProductModalLabel">
              Редактировать Товар
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Заголовок
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="Banan.."
                  aria-describedby="defaultFormControlHelp"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="largeSelect" className="form-label">
                  Категория
                </label>
                <select
                  id="largeSelect"
                  className="form-select form-select"
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
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Цена
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="15,000"
                  aria-describedby="defaultFormControlHelp"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Размер
                </label>
                <Select
                  defaultValue={[
                    selectDefaultValues[(0, selectDefaultValues.length)],
                  ]}
                  isMulti
                  name="sizes"
                  value={selectDefaultValues}
                  options={sizeOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSizeChange}
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Цвет
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="Black..."
                  aria-describedby="defaultFormControlHelp"
                  value={product.color}
                  onChange={(e) =>
                    setProduct({ ...product, color: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div> */}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Описание (Необязательно)
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Bu mahsulotimiz..."
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Загрузить Изобрежание
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                />
              </div>
              {product?.image?.length ? (
                <div className="mb-3">
                  <img src={`${product.image}`} alt="uploaded" width={200} />
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              onClick={handleEditProduct}
              type="button"
              className="btn btn-success"
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
      await axios.delete(`/api/v1/product/${id}`);
    } catch (error) {
      console.log(`Error in deleting category ${error}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteProductModal"
      tabIndex="-1"
      aria-labelledby="deleteProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteProductModalLabel">
              <div className="alert">
                Вы уверены, что хотите удалить этот продукт?
              </div>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="modal-footer d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              type="button"
              className="btn btn-danger"
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
