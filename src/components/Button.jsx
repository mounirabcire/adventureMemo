import { Link } from "react-router-dom";

function Button({ type = "default", children, link = false, to = "/" }) {
    // If the button is a link, so we'll use the Link React Component instead of the button element
    if (link) {
        if (type === "default")
            return (
                <Link
                    to={to}
                    className="px-15px py-10px text-white bg-primary rounded-sm font-semibold"
                >
                    {children}
                </Link>
            );

        if (type === "ghost")
            return (
                <Link
                    to={to}
                    className="px-15px py-10px text-primary border-primary border bg-transparent rounded-sm font-semibold"
                >
                    {children}
                </Link>
            );
    }
}

export default Button;
