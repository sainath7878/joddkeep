import { useAuth } from "context";
import { useEffect } from "react";
import "./toast.css";

function Toast() {
  const {
    authState: {
      toast: { type, msg, toastState },
    },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      authDispatch({
        type: "SET_TOAST",
        payload: {
          state: false,
          msg: "",
          type: "",
        },
      });
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className={`snackbar ${type} ${toastState ? "show" : "hide"}`}>
      <p className="fs-m">{msg}</p>
    </div>
  );
}

export { Toast };
