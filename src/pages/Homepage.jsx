import { Link } from "react-router-dom";
import logo from "../../public/assets/images/logo.svg";
import Button from "../components/Button";

function Homepage() {
    return (
        <header className="homepage-header min-h-screen text-black relative">
            <div className="bg-[#000000b9] absolute top-0 left-0 w-full h-full">
                <div className="container">
                    <nav className="pt-30px flex items-center justify-between">
                        <div>
                            <span>
                                <Link to="/">
                                    <img
                                        className="h-auto w-[150px]"
                                        src={logo}
                                        alt="Logo"
                                    />
                                </Link>
                            </span>
                        </div>
                        <div>
                            <Button type="link">Start Tracking</Button>
                        </div>
                    </nav>
                    <section className="homepage-section space-y-30px flex flex-col items-center justify-center mb-30px">
                        <div className="text-center space-y-15px flex flex-col items-center justify-center">
                            <h1 className="max-w-[1000px] text-h2 text-secondary font-bold">
                                You go to different places around the world. We
                                remembers all the cool things you do on your
                                trips.
                            </h1>
                            <p className=" max-w-[665px] text-white">
                                A world map that tracks your footsteps into
                                every city you can think of. Never forget your
                                wonderful experiences, and show your friends how
                                you have wandered the world.
                            </p>
                        </div>
                        <div className="text-center">
                            <Button>Start Tracking</Button>
                        </div>
                    </section>
                </div>
            </div>
        </header>
    );
}

export default Homepage;
