import { Marker, Popup } from "react-leaflet";

function CityMapPosition({ position, city }) {
    return (
        <Marker position={position}>
            <Popup>{city}</Popup>
        </Marker>
    );
}

export default CityMapPosition;
