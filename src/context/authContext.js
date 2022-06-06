import { createContext, useContext, useReducer, useState } from "react";
import { initialState, authReducer } from "reducer/authReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authState, authDispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    const [error, setError] = useState({ msg: "", state: false });

    const signInHandler = async (loginDetails) => {
        const { email, password } = loginDetails;

        try {
            const response = await axios.post("/api/auth/login", {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.encodedToken);
                authDispatch({
                    type: "SET_USER",
                    payload: {
                        isLoggedIn: true,
                        encodedToken: response.data.encodedToken,
                        email: response.data.foundUser.email,
                        firstName: response.data.foundUser.firstName,
                    },
                }
                );
                toast.success("Login Successful");
                navigate("/notes", { replace: true });
            }
        } catch (err) {
            console.log("Error while signin In ", err);
            setError({ msg: "Please Enter valid Credentials", state: true });
            toast.error(err.response.data.errors[0]);
        }
    };

    const signUpHandler = async ({ firstName, email, password }) => {
        try {
            const response = await axios.post("/api/auth/signup", {
                email: email,
                password: password,
                firstName: firstName,
            });
            if (response.status === 201) {
                authDispatch({
                    type: "SET_USER",
                    payload: {
                        isLoggedIn: true,
                        _id: response.data.createdUser._id,
                        email: response.data.createdUser.email,
                        encodedToken: response.data.encodedToken,
                        firstName: response.data.createdUser.firstName,
                    },
                });
                toast.success("Sign Up Successful");
                navigate("/notes", { replace: true });
            }
        } catch (err) {
            setError({ msg: "Try again after some time", status: true });
            console.log("Could not signUp", err);
            toast.error(err.response.data.errors[0]);
        }
    };

    return <AuthContext.Provider value={{ authState, authDispatch, signInHandler, signUpHandler, setError, error }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }