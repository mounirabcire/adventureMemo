import { Marker, Popup } from "react-leaflet";

function CityMapPosition({ position, city, countryCode }) {
    return (
        <Marker position={position}>
            <Popup>
                <div className="w-[70px] flex items-center justify-center gap-5px">
                    <span>
                        <img
                            src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                            width="40"
                            alt="flage"
                        />
                    </span>
                    <span>{city}</span>
                </div>
            </Popup>
        </Marker>
    );
}

export default CityMapPosition;
