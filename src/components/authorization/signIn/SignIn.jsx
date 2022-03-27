import "../authorization.css";
import { BiDoorOpenFill, BiEyeFill, BiEyeSlashFill } from "assets/icons/Icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function SignIn() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState({ msg: "", state: false });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError({ msg: "", state: false });
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [error.state]);

  const formHandler = (event) => {
    event.preventDefault();
    const { email, password } = loginDetails;
    if (!email && !password) {
      setError({ msg: "Please fill all the fields", state: true });
    } else {
      console.log("From SIgnin");
    }
  };

  return (
    <form className="form d-flex align-center flex-column">
      <h1 className="fs-l text-align-center">Login</h1>
      <p className="danger-text fs-s">{error.state && error.msg}</p>
      <input
        type="email"
        id="email"
        placeholder="Enter Email"
        className={`form-input ${error.state ? "error-border" : ""}`}
        onChange={(e) =>
          setLoginDetails({ ...loginDetails, email: e.target.value })
        }
      />{" "}
      <div className="password-input">
        <input
          type={`${showPassword ? "password" : "text"}`}
          id="password"
          placeholder="Enter Password"
          className={`form-input ${error.state ? "error-border" : ""}`}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
        <span className="visibility-icon fs-s">
          {showPassword ? (
            <BiEyeFill onClick={() => setShowPassword(false)} />
          ) : (
            <BiEyeSlashFill onClick={() => setShowPassword(true)} />
          )}
        </span>
      </div>
      <button type="button" className="btn btn-secondary-outline fs-s">
        <BiDoorOpenFill />
        LOGIN WITH TEST CREDENTIALS
      </button>
      <button
        className="btn btn-secondary fs-s"
        onClick={(e) => formHandler(e)}
      >
        <BiDoorOpenFill />
        LOGIN
      </button>
      <Link to="/signup" className="fs-s">
        Not a Member yet? <span className="underline">Sign up now</span>
      </Link>
    </form>
  );
}

export { SignIn };
