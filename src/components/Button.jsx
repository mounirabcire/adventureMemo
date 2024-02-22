import { Link } from "react-router-dom";

function Button({
    type = "default",
    children,
    link = false,
    to = "/",
    className = "",
    event = null,
}) {
    // If the button is a link, so we'll use the Link React Component instead of the button element
    if (link) {
        if (type === "default")
            return (
                <Link
                    to={to}
                    className={
                        className === ""
                            ? "px-15px py-10px inline-block text-white bg-primary rounded-sm font-semibold"
                            : className
                    }
                >
                    {children}
                </Link>
            );

        if (type === "ghost")
            return (
                <Link
                    to={to}
                    className={
                        className === ""
                            ? "px-15px py-10px inline-block text-primary border-primary border bg-transparent rounded-sm font-semibold"
                            : className
                    }
                >
                    {children}
                </Link>
            );
    }

    // If the button is not a link, so we'll use the button element
    return (
        <button
            onClick={event}
            className={
                className === ""
                    ? "px-15px py-10px text-white inline-block bg-primary rounded-sm font-semibold"
                    : className
            }
        >
            {children}
        </button>
    );
}

export default Button;
