function Button({ type = "default", children }) {
    if (type === "default")
        return (
            <button className="px-15px py-10px text-white bg-primary rounded-sm font-semibold">
                {children}
            </button>
        );

    if (type === "link")
        return (
            <button className="px-15px py-10px text-primary border-primary border bg-transparent rounded-sm font-semibold">
                {children}
            </button>
        );
}

export default Button;
