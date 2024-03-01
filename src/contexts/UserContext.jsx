import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const initialState = {
    username: "",
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
        default:
            return { ...state };
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    function handleLogin(username) {
        if (!username) return;
        dispatch({ type: "user/login", payload: username });
        navigate("/map");
    }

    return (
        <UserContext.Provider
            value={{ states: { ...state }, updaters: { handleLogin } }}
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
