import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const {
        updaters: { handleLogin },
        states: { isAuthenticated },
    } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            navigate("/map", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <section className="section-loginpage min-h-screen flex items-center justify-center">
            <div className="bg-[#000000b9] fixed top-0 left-0 w-full h-screen"></div>
            <div className="max-w-[800px] mx-5px px-10px py-30px rounded-md backdrop-blur-sm bg-[#ffffff07] text-center space-y-30px relative">
                <h2 className="text-h2 text-secondary font-bold">
                    Adventure Awaits - Login Here
                </h2>
                <form>
                    <div className="space-x-15px">
                        <input
                            type="text"
                            placeholder="username..."
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value.toUpperCase())
                            }
                            className="px-5px py-10px border border-primary outline-none bg-transparent rounded-sm text-white"
                        />
                        <Button
                            event={(e) => {
                                e.preventDefault();
                                handleLogin(username.trim());
                                setUsername("");
                            }}
                        >
                            Enter
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
