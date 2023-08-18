export const AddCategoryModal = () => {
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
              Create Category
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

export const EditCategoryModal = () => {
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
                />
                <div id="defaultFormControlHelp" class="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
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

export const DeleteCategoryModal = () => {
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
            <button type="button" class="btn btn-danger">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
