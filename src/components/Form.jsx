import Button from "./Button";

function Form({ setFromIsOpen }) {
    return (
        <div className="w-[350px] min-h-[300px] backdrop-blur-sm rounded-sm bg-[#00000080] flex items-center justify-center absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <form className="space-y-30px py-30px">
                <div className="space-y-15px">
                    <div className="space-y-5px">
                        <label htmlFor="cityName" className="block text-white">
                            City name
                        </label>
                        <input
                            type="text"
                            name="cityName"
                            className="inline-block w-full outline-none rounded-sm bg-transparent border-2 border-primary text-white p-5px"
                        />
                    </div>
                    <div className="space-y-5px">
                        <label htmlFor="when" className="block text-white">
                            When did you go to city name?
                        </label>
                        <input
                            type="data"
                            name="when"
                            className="inline-block w-full outline-none rounded-sm bg-transparent border-2 border-primary text-white p-5px"
                        />
                    </div>
                    <div className="space-y-5px">
                        <label htmlFor="notes" className="block text-white">
                            Notes about your trip to City name
                        </label>
                        <input
                            type="date"
                            name="notes"
                            className="inline-block w-full outline-none rounded-sm bg-transparent border-2 border-primary text-white p-5px"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Button>Add</Button>
                    <Button event={() => setFromIsOpen(false)}>Go Back</Button>
                </div>
            </form>
        </div>
    );
}

export default Form;
