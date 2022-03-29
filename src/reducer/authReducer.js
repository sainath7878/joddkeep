const initialState = {
    isLoggedIn: false,
    _id: "",
    email: "",
    encodedToken: "",
    firstName: ""
}

const authReducer = (authState, { type, payload }) => {
    switch (type) {
        case "SET_USER":
            return { ...authState, isLoggedIn: payload.isLoggedIn, email: payload.email, encodedToken: payload.encodedToken, firstName: payload.firstName, _id: payload._id }
        case "LOGOUT":
            return { ...authState, isLoggedIn: false, email: "", encodedToken: "", firstName: "" }
        default:
            return authState
    }
}

export { initialState, authReducer }