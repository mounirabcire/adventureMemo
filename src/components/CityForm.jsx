import { Form, useNavigation, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { addCity } from "../services/apiCities";
import { useCity } from "../contexts/CityContext";
import { useEffect, useState } from "react";

function CityForm({ setFormIsOpen }) {
    const {
        states: { city, country, continent, countryCode },
    } = useCity();
    // This num state is used to count whenever the app is on idle state.
    const [num, setNum] = useState(0);
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        //when the app is on idle state so the num state will be incremented by 1.
        // when this component first mounts the app automatically is on idle state, so (num = 1)
        if (navigation.state === "idle") setNum((n) => n + 1);
        // when submitting, the the app state will change, and it'll triger this effect, then nothing will happen, then teh app state will be back to the idle state, (num = 2)
        if (num === 2) setFormIsOpen(false);
        // I didn't want to add the num state as dependency because whenever the num state changes it'll triger this effect (infinite loop until the num will be 2). 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation.state, setFormIsOpen]);

    return (
        <div className="w-[350px] min-h-[300px] backdrop-blur-sm rounded-sm bg-[#00000080] flex items-center justify-center absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Form method="POST" className="space-y-30px py-30px">
                <div className="space-y-15px">
                    <div className="space-y-5px">
                        <label htmlFor="city" className="block text-white">
                            City name
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            defaultValue={city}
                            required
                            className="inline-block w-full outline-none rounded-sm bg-transparent border-2 border-primary text-white p-5px"
                        />
                    </div>
                    <div className="space-y-5px">
                        <label htmlFor="date" className="block text-white">
                            When did you go to city name?
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            defaultValue={new Date().toLocaleDateString()}
                            required
                            className="inline-block w-full outline-none rounded-sm bg-transparent border-2 border-primary text-white p-5px"
                        />
                    </div>
                    <div className="space-y-5px">
                        <label htmlFor="notes" className="block text-white">
                            Notes about your trip to City name
                        </label>
                        <input
                            type="text"
                            id="notes"
                            name="notes"
                            className="inline-block w-full outline-none rounded-sm bg-transparent border-2 border-primary text-white p-5px"
                        />
                    </div>

                    <input
                        type="hidden"
                        name="position"
                        value={JSON.stringify([lat, lng])}
                    />
                    <input
                        type="hidden"
                        name="cityInfo"
                        value={JSON.stringify({
                            continent,
                            country,
                            countryCode,
                        })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button>
                        {navigation.state === "submitting"
                            ? "Adding..."
                            : "Add"}
                    </Button>
                    <div
                        onClick={() => setFormIsOpen(false)}
                        className="px-15px py-10px text-white inline-block bg-primary rounded-sm font-semibold cursor-pointer"
                    >
                        Close
                    </div>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    // When the form is submitted, react router will call the action function and pass in the request that was submitted.
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const newCity = {
        ...data,
        position: JSON.parse(data.position),
        cityInfo: JSON.parse(data.cityInfo),
    };
    const city = await addCity(newCity);
    console.log(city);

    return null;
}

// export async function loader({ request }) {
//     const url = new URL(request.url);
//     console.log(url)
//     const lat = url.searchParams.get("lat");
//     const lng = url.searchParams.get("lng");
//     console.log(lat, lng);

//     return null;
// }

export default CityForm;
