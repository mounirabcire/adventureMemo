import { Form, redirect, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { addCity } from "../services/apiCities";

function CityForm({ setFromIsOpen }) {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className="w-[350px] min-h-[300px] backdrop-blur-sm rounded-sm bg-[#00000080] flex items-center justify-center absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Form method="POST" className="space-y-30px py-30px">
                <div className="space-y-15px">
                    <div className="space-y-5px">
                        <label htmlFor="cityName" className="block text-white">
                            City name
                        </label>
                        <input
                            type="text"
                            id="cityName"
                            name="cityName"
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
                </div>
                <div className="flex items-center justify-between">
                    <Button>Add</Button>
                    <Button event={() => setFromIsOpen(false)}>Close</Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const newCity = {
        ...data,
        position: JSON.parse(data.position),
    };
    await addCity(newCity);

    return redirect("/map");
}

export default CityForm;
