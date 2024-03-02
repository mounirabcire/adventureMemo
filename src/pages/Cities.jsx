import { useLoaderData } from "react-router-dom";
import { fetchCities } from "../services/apiCities";
import CityItem from "../components/CityItem";

function Cities() {
    const cities = useLoaderData();
    
    return (
        <div className="space-y-15px relative max-h-[400px] pb-5px overflow-hidden overflow-y-scroll">
            {cities.map((city, index) => (
                <CityItem city={city} key={index} />
            ))}
        </div>
    );
}

export async function loader() {
    const cities = await fetchCities();

    return cities;
}
export default Cities;
