import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchCities } from "../services/apiCities";
import Button from "../components/Button";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
function City() {
    const {
        city,
        cityInfo: { continent, countryCode, country },
        date,
        notes,
    } = useLoaderData();
    const navigate = useNavigate();

    return (
        <div className="cityCard relative px-2 py-3 space-y-10px bg-white rounded-sm">
            <div>
                <h5 className="text-[11px] font-semibold text-black-light uppercase">
                    City name
                </h5>
                <h3 className="text-h3 flex justify-between">
                    <span>{city}</span>
                    <span>
                        <img
                            src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png 2x`}
                            width="80"
                            alt="flage"
                            className="absolute top-0 right-0"
                        />
                    </span>
                </h3>
            </div>

            <div>
                <h5 className="text-[11px] font-semibold text-black-light uppercase">
                    Continent
                </h5>
                <p>
                    <span>{continent}</span>
                </p>
            </div>
            <div>
                <h5 className="text-[11px] font-semibold text-black-light uppercase">
                    Country
                </h5>
                <p>
                    <span>{country}</span>
                </p>
            </div>
            <div>
                <h5 className="text-[11px] font-semibold text-black-light uppercase">
                    You went to {city} on
                </h5>
                <p>{formatDate(date || null)}</p>
            </div>

            {notes !== "" && (
                <div>
                    <h5 className="text-[11px] font-semibold text-black-light uppercase">
                        Your notes
                    </h5>
                    <p>{notes}</p>
                </div>
            )}

            <div>
                <h5 className="text-[11px] font-semibold text-black-light uppercase">
                    Learn more
                </h5>
                <a
                    href={`https://en.wikipedia.org/wiki/${city}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary"
                >
                    Check out {city} on Wikipedia &rarr;
                </a>
            </div>

            <Button event={() => navigate(-1)}>Back</Button>
        </div>
    );
}

export async function loader({ params }) {
    const city = await fetchCities(params.id);
    
    return city;
}
export default City;
