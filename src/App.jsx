import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Map from "./pages/Map";
import { action as formAction } from "./components/CityForm";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/map",
            element: <Map />,
            action: formAction,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
