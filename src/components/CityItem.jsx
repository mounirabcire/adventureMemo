import { useNavigate } from "react-router-dom";

function CityItem({ city }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/map/cities/${city.id}`);
    }

    return (
        <div
            onClick={handleClick}
            className="city relative overflow-hidden px-2 py-3 flex items-center justify-between bg-white rounded-sm  cursor-pointer"
        >
            <h3 className="z-10">{city.city}</h3>

            <img
                src={`https://flagcdn.com/w160/${city.cityInfo.countryCode.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w320/${city.cityInfo.countryCode.toLowerCase()}.png 2x`}
                width="160"
                alt="flage"
                className="absolute right-0"
            />
        </div>
    );
}

export default CityItem;
