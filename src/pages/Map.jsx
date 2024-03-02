import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    useMap,
    useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation.js";

import Button from "../components/Button";
import UserBar from "../components/UserBar.jsx";
import SideBar from "../components/SideBar.jsx";
import CityForm from "../components/CityForm.jsx";
import { fetchCities, getCityInfo } from "../services/apiCities.js";
import { useCity } from "../contexts/CityContext.jsx";
import CityMapPosition from "../components/CityMapPosition.jsx";

function Map() {
    const [position, setPosition] = useState([50, 0]);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [sideBarisOpen, setSideBarIsOpen] = useState(false);
    const cities = useLoaderData();

    // Get the user's position.
    const {
        position: currentPosition,
        loading,
        error,
        getCurrPosition,
    } = useGeolocation();

    // useEffect(() => {
    //     if (currentPosition?.lng && currentPosition?.lat) {
    //         setPosition([currentPosition.lat, currentPosition.lng]);
    //     }
    // }, [currentPosition?.lat, currentPosition?.lng]);

    return (
        <div className="h-screen">
            <UserBar />
            <SideBar
                setFormIsOpen={setFormIsOpen}
                isOpen={sideBarisOpen}
                setIsOpen={setSideBarIsOpen}
            />
            {formIsOpen && <CityForm setFormIsOpen={setFormIsOpen} />}
            <MapContainer
                className="h-full z-0"
                center={position}
                zoom={6}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.length !== 0 &&
                    cities.map((city) => (
                        <CityMapPosition
                            position={city.position}
                            city={city.city}
                            countryCode={city.cityInfo.countryCode}
                            key={city.id}
                        />
                    ))}

                <ChangeMapView position={position} />
                <ClickMapEvent
                    setFormIsOpen={setFormIsOpen}
                    setPosition={setPosition}
                    setSideBarIsOpen={setSideBarIsOpen}
                />
            </MapContainer>

            <div>
                <Button
                    event={getCurrPosition}
                    className="px-15px py-10px inline-block shadow-2xl text-white bg-primary rounded-sm font-semibold absolute bottom-30px left-1/2 translate-x-[-50%] z-10"
                >
                    {loading ? "Loading..." : "Your Location"}
                </Button>
            </div>
        </div>
    );
}

function ChangeMapView({ position }) {
    const map = useMap();
    // Whenever the position changes the map view will change.
    map.setView(position, 6);

    return null;
}

function ClickMapEvent({ setFormIsOpen, setPosition, setSideBarIsOpen }) {
    const navigate = useNavigate();
    const {
        updaters: { updateCity },
    } = useCity();

    useMapEvent({
        click: async (e) => {
            // When clicking on a place on the map we'll get the latitude and longitude of that place.
            // We pass the latitude and longitude in the URL parameters
            navigate(`/map?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

            const cityInfo = await getCityInfo(e.latlng.lat, e.latlng.lng);

            // If the user clicked somewhere in the map that is not a city (clicking on a sea) so we'll return an error.
            if (cityInfo?.error !== undefined && cityInfo?.error !== "") {
                alert(cityInfo?.error);
                return;
            }
            updateCity(cityInfo);

            setPosition([e.latlng.lat, e.latlng.lng]);
            setFormIsOpen(true);
            setSideBarIsOpen(false);
        },
    });
    return null;
}

export async function loader() {
    const cities = await fetchCities();

    return cities;
}

export default Map;
