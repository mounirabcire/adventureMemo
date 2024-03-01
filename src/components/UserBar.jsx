import { useUser } from "../contexts/UserContext";
import Button from "./Button";

function UserBar() {
    const {states: {username}} = useUser();

    return (
        <div className="w-[250px] md:w-[350px] shadow-xl px-15px py-5px rounded-lg bg-black flex items-center justify-between absolute top-10px right-5px z-10">
            <div className="flex items-center">
                <i className="ri-user-line"></i>
                <div className="text-secondary">{username}</div>
            </div>
            <div>
                <Button link={true} to="/" type="ghost">
                    Home
                </Button>
            </div>
        </div>
    );
}

export default UserBar;
