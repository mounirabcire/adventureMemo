import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";

// FIXME: Homepage Component --> The background image
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
