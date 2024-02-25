import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation.js";

import Button from "../components/Button";
import UserBar from "../components/UserBar.jsx";
import SideBar from "../components/SideBar.jsx";
import CityForm from "../components/CityForm.jsx";
import { getCityInfo } from "../services/apiCities.js";
import { useCity } from "../contexts/CityContext.jsx";

function Map() {
    const [position, setPosition] = useState([50, 0]);
    const [formIsOpen, setFromIsOpen] = useState(false);

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
            <SideBar />
            {formIsOpen && <CityForm setFromIsOpen={setFromIsOpen} />}
            <MapContainer
                className="h-full z-0"
                center={position}
                zoom={8}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* When we have the cities data we'll dispaly these components */}
                {/* <Marker position={position}>
                    <Popup>I'm here in this position</Popup>
                </Marker> */}

                <ChangeMapView position={position} />
                <ClickMapEvent
                    setFromIsOpen={setFromIsOpen}
                    setPosition={setPosition}
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

function ClickMapEvent({ setFromIsOpen, setPosition }) {
    const navigate = useNavigate();
    const {
        updaters: { updateCity },
    } = useCity();

    useMapEvent({
        click: async (e) => {
            // When clicking on a place on the map we'll get the latitude and longitude of that place.
            // We pass the latitude and longitude in the URL parameters
            navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            const cityInfo = await getCityInfo(e.latlng.lat, e.latlng.lng);
            updateCity(cityInfo);
            setPosition([e.latlng.lat, e.latlng.lng]);
            setFromIsOpen(true);
        },
    });
    return null;
}

export default Map;
