import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import CountryItem from "../components/CountryItem";

function Countries() {
    const fetcher = useFetcher();
    const cities = fetcher?.data ?? [];
    const countries = cities.reduce((prev, city) => {
        if (
            !prev
                .map((country) => country.countryCode)
                .includes(city.cityInfo.countryCode)
        )
            return [
                ...prev,
                {
                    country: city.cityInfo.country,
                    countryCode: city.cityInfo.countryCode,
                },
            ];
        else return [...prev];
    }, []);
    // Loading the cities data withou causing navigation;
    useEffect(() => {
        if (!fetcher.data && fetcher.state === "idle")
            fetcher.load("/map/cities");
    }, [fetcher]);

    return (
        <div className="flex flex-wrap gap-15px max-h-[400px] pb-5px overflow-hidden overflow-y-scroll">
            {countries.map((country) => (
                <CountryItem country={country} key={country.countryCode} />
            ))}
            ;
        </div>
    );
}

export default Countries;
