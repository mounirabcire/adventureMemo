import { useState } from "react";
import logo from "../../public/assets/images/logo.svg";
import { Link, Outlet } from "react-router-dom";
function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

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
                                <Link to="/map/cities">Cities</Link>
                            </li>
                            <li>
                                <Link to="/map/countries">Countries</Link>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
            {isOpen === true ? (
                <div
                    onClick={() => setIsOpen(false)}
                    className="text-white p-5px pl-15px rounded-tr-xl rounded-br-xl absolute top-1/2 right-[-37px] bg-black flex items-center justify-center cursor-pointer"
                >
                    &larr;
                </div>
            ) : (
                <div
                    onClick={() => setIsOpen(true)}
                    className="text-white p-5px pl-15px rounded-tr-xl rounded-br-xl absolute top-1/2 right-[-37px] bg-black flex items-center justify-center cursor-pointer transition-all"
                >
                    &rarr;
                </div>
            )}
        </div>
    );
}

export default SideBar;
