import axios from "../api/axios";

export const AddProductModal = () => {
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
              Create Product
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
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="largeSelect" class="form-label">
                  Category
                </label>
                <select id="largeSelect" class="form-select form-select">
                  <option>Select category</option>
                  <option value="1">Ichimliklar</option>
                  <option value="2">Mevalar</option>
                  <option value="3">Shirinliklar</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Size
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Color
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Description (optional)
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Bu mahsulotimiz..."
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Upload Image
                </label>
                <input class="form-control" type="file" id="formFile" />
              </div>
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
            <button type="button" class="btn btn-primary">
              CREATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditProductModal = () => {
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
              Update Product
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
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="largeSelect" class="form-label">
                  Category
                </label>
                <select id="largeSelect" class="form-select form-select">
                  <option>Select category</option>
                  <option value="1">Ichimliklar</option>
                  <option value="2">Mevalar</option>
                  <option value="3">Shirinliklar</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Size
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="defaultFormControlInput" class="form-label">
                  Color
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="defaultFormControlInput"
                  placeholder="John Doe"
                  aria-describedby="defaultFormControlHelp"
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Description (optional)
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Bu mahsulotimiz..."
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Upload Image
                </label>
                <input class="form-control" type="file" id="formFile" />
              </div>
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
            <button type="button" class="btn btn-success">
              SAVE
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
      const res = await axios.delete(`/product/${id}`);
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
              <div class="alert">Are you sure to delete this product?</div>
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
            <button type="button" class="btn btn-danger" onClick={handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
