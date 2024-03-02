import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const initialState = {
    username: "",
    error: "",
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "user/login":
            return {
                ...state,
                username: action.payload,
                isAuthenticated: true,
            };
        case "user/error":
            return {
                ...state,
                error: action.payload,
            };
        case "user/setError":
            return {
                ...state,
                error: "",
            };
        default:
            return { ...state };
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    function handleLogin(username) {
        if (!username) {
            dispatch({
                type: "user/error",
                payload: "The username is required",
            });
            return;
        }
        dispatch({ type: "user/login", payload: username });
        navigate("/map");
    }

    function handleSetError() {
        dispatch({ type: "user/setError" });
    }

    return (
        <UserContext.Provider
            value={{ states: { ...state }, updaters: { handleLogin, handleSetError } }}
        >
            {children}
        </UserContext.Provider>
    );
}

function useUser() {
    const context = useContext(UserContext);
    if (!context)
        throw new Error("useUser must be used within the UserProvider!");
    return context;
}

export { UserProvider, useUser };
