import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Map, { loader as mapLoader } from "./pages/Map";
import { action as formAction } from "./components/CityForm";
import { CityProvider } from "./contexts/CityContext";
import Cities, { loader as citiesLoader } from "./pages/Cities";
import Countries from "./pages/Countries";
import City, { loader as cityLoader } from "./pages/City";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./components/Error";

function App() {
    //FIXME: We can add the same city multiple times.

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                // if I dont wrapp the homepage within the UserProvider, the useProvideer will lose it's data and back to the initial state.
                // Because if i try to go to the login page instead of navigate to the map page beacause the user is already authenticated, it'll set the state back to the initial state (UserProvider first time mouts! ==> inside the login page)
                <UserProvider>
                        <Homepage />,
                </UserProvider>
            ),
            errorElement: <Error />,
        },
        {
            path: "/login",
            element: (
                <UserProvider>
                        <Login />
                </UserProvider>
            ),
        },
        {
            path: "/map",
            loader: mapLoader,
            element: (
                <UserProvider>
                    <CityProvider>
                        <ProtectedRoute>
                            <Map />
                        </ProtectedRoute>
                    </CityProvider>
                </UserProvider>
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
