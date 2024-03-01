import { createContext, useContext, useReducer } from "react";

const CityContext = createContext();
const initialState = {
    continent: "",
    country: "",
    countryCode: "",
    city: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "city/selected":
            // payload = {}
            return {
                ...state,
                ...action.payload,
            };
        default:
            console.error("Unknown action type!");
            return { ...state };
    }
}

function CityProvider({ children }) {
    function updateCity(data) {
        dispatch({ type: "city/selected", payload: { ...data } });
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <CityContext.Provider
            value={{ states: { ...state }, updaters: { updateCity } }}
        >
            {children}
        </CityContext.Provider>
    );
}

function useCity() {
    const context = useContext(CityContext);
    if (!context) throw new Error("useCity must be used within a CityProvider");
    return context;
}

export { CityProvider, useCity };