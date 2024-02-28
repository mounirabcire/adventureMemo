const CITIES_DATA = "http://localhost:9000";
const CITY_INFO = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

export async function fetchCities(cityId = null) {
    try {
        const res = await fetch(
            `${CITIES_DATA}/cities/${cityId === null ? "" : cityId}`
        );
        if (!res.ok) throw new Error("Couldn't fetch cities data");
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

export async function addCity(newCity) {
    try {
        const res = await fetch(`${CITIES_DATA}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
        const data = await res.json();
        return data;
    } catch {
        throw Error("Failed creating your order");
    }
}

export async function getCityInfo(lat, lng) {
    if (!lat && !lng) return;

    try {
        const res = await fetch(`${CITY_INFO}latitude=${lat}&longitude=${lng}`);
        const {
            city,
            continent,
            countryName: country,
            countryCode,
        } = await res.json();
        if (!countryCode)
            return {
                error: "That doesn't seems to be a city. Click somewhere else. 😉",
            };

        const cityInfo = {
            continent,
            country,
            countryCode,
            city,
        };

        return cityInfo;
    } catch (err) {
        console.log(err.message);
    }
}
