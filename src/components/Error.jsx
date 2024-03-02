import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";

function Error() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.log(error);
    return (
        <div className="mt-30px ml-5px w-[350px] space-y-15px text-red-500 rounded-sm bg-black px-2 py-3">
            <p>{error.error.message}</p>
            <Button event={() => navigate(-1)}>Back</Button>
        </div>
    );
}

export default Error;
