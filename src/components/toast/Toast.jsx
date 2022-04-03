import { BiXLg } from "assets/icons/Icons";

function Toast({ type, text, action }) {
  return (
    <div className={`snackbar ${type} ${action}`}>
      <p className="fs-m">{text}</p>
      <button className="snackbar-btn">
        <BiXLg className="fs-m" />
      </button>
    </div>
  );
}

export { Toast };
