import { useEffect } from "react";
import Logo from "../assets/images/logo-darkor-removebg.png";

const Toast = ({ toggle, setToggle, data }) => {
  useEffect(() => {
    if (toggle === true) {
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    }
  }, [toggle]);
  return (
    <div class="position-fixed top-0 end-0 p-3" style={{ zIndex: "1000" }}>
      <div
        id="liveToast"
        class={`toast ${toggle ? "show" : "hide"}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <img width={30} src={Logo} class="rounded me-2" alt="logo" />
          <strong class="me-auto">Darkor | Xabar</strong>
          <small>Now</small>
          <button
            type="button"
            class="btn-close"
            onClick={() => setToggle(false)}
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body bg-danger text-white">{data}</div>
      </div>
    </div>
  );
};

export default Toast;
