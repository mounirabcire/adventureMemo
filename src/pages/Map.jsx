import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvent,
} from "react-leaflet";
import Button from "../components/Button";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserBar from "../components/UserBar.jsx";
import SideBar from "../components/SideBar.jsx";

function Map() {
    const [position, setPostion] = useState([10, 90]);

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
            <SideBar />
            <UserBar />
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
                <Marker position={position}>
                    <Popup>I'm here in this position</Popup>
                </Marker>

                <ChangeMapView position={position} />
                <ClickMapEvent />
            </MapContainer>

            <div>
                <Button
                    event={getCurrPosition}
                    className="px-15px py-10px inline-block shadow-2xl text-white bg-primary rounded-sm font-semibold absolute bottom-30px left-1/2 translate-x-[-50%] z-10"
                >
                    Your Location
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

function ClickMapEvent() {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => {
            navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
    return null;
}

export default Map;
