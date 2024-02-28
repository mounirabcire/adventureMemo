import logo from "../../public/assets/images/logo.svg";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
function SideBar({ isOpen, setIsOpen, setFormIsOpen }) {
    const navigate = useNavigate();

    return (
        <div
            className={`h-screen w-[90%] lg:w-[50%] bg-black  rounded-tr-md rounded-br-md transition-all absolute top-0 ${
                isOpen === true ? "left-0" : "lg:left-[-50%] left-[-90%]"
            } z-20`}
        >
            <div className="container space-y-60px">
                <div className="mt-[45px]">
                    <img
                        className="h-auto w-[150px] ml-auto mr-auto"
                        src={logo}
                        alt="Logo"
                    />
                </div>
                <div>
                    <nav className="text-white">
                        <ul className="flex items-center justify-center gap-90px">
                            <li>
                                <NavLink
                                    to="/map/cities"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary" : ""
                                    }
                                >
                                    Cities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/map/countries"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary" : ""
                                    }
                                >
                                    Countries
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-30px">
                        <Outlet />
                    </div>
                </div>
            </div>
            {isOpen === true ? (
                <div
                    onClick={() => {
                        setIsOpen(false);
                        navigate("/map");
                    }}
                    className="text-white p-5px pl-15px rounded-tr-xl rounded-br-xl absolute top-1/2 right-[-37px] bg-black flex items-center justify-center cursor-pointer"
                >
                    &larr;
                </div>
            ) : (
                <div
                    onClick={() => {
                        setIsOpen(true);
                        navigate("/map/cities");
                        setFormIsOpen(false);
                    }}
                    className="text-white p-5px pl-15px rounded-tr-xl rounded-br-xl absolute top-1/2 right-[-37px] bg-black flex items-center justify-center cursor-pointer transition-all"
                >
                    &rarr;
                </div>
            )}
        </div>
    );
}

export default SideBar;
