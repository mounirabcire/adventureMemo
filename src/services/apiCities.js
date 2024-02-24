const API_URL = "http://localhost:9000";

export async function addCity(newCity) {
    try {
        const res = await fetch(`${API_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
    } catch {
        throw Error("Failed creating your order");
    }
}
