import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Map from "./pages/Map";
import { action as formAction } from "./components/CityForm";
import { CityProvider } from "./contexts/CityContext";
import Cities, { loader as citiesLoader } from "./pages/Cities";
import Countries from "./pages/Countries";
import City, {loader as cityLoader} from "./pages/City";

function App() { 
    //FIXME: We can add the same city multiple times.

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

            element: (
                <CityProvider>
                    <Map />
                </CityProvider>
            ),
            action: formAction,
            children: [
                {
                    path: "/map/cities",
                    element: <Cities />,
                    loader: citiesLoader,
                },
                {
                    path: "/map/cities/:id",
                    element: <City />,
                    loader: cityLoader,
                },
                {
                    path: "/map/countries",
                    element: <Countries />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
