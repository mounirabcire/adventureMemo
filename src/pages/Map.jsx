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

function Map() {
    const [position, setPostion] = useState([10, 90]);
    const [formIsOpen, setFromIsOpen] = useState(false);

    // This position is commitg from the user current position.
    const {
        position: currentPosition,
        loading,
        error,
        getCurrPosition,
    } = useGeolocation();

    useEffect(() => {
        if (currentPosition?.lng && currentPosition?.lat) {
            console.log("effect");
            setPostion([currentPosition.lat, currentPosition.lng]);
        }
    }, [currentPosition?.lat, currentPosition?.lng]);

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
                {/* When wh have the cities data we'll dispaly these components */}
                {/* <Marker position={position}>
                    <Popup>I'm here in this position</Popup>
                </Marker> */}

                <ChangeMapView position={position} />
                <ClickMapEvent
                    setFromIsOpen={setFromIsOpen}
                    setPosition={setPostion}
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
    map.setView(position, 6);

    return null;
}

function ClickMapEvent({ setFromIsOpen, setPosition }) {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => {
            navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            setPosition([e.latlng.lat, e.latlng.lng]);
            setFromIsOpen(true);
        },
    });
    return null;
}

export default Map;
