import { useState } from "react";

function useGeolocation() {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function getCurrPosition() {
        // before getting the position we'll set the error state back to the original state, if there was an error before.
        setError("");

        // If the user browser doesn't support geolocation
        if (!navigator.geolocation)
            setError("Your browser does not support geolocation");
        // If the user browser supports geolocation
        else {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoading(false);
                },
                (error) => {
                    setError(error.message);
                    setLoading(false);
                }
            );
        }
    }

    return { position, error, loading, getCurrPosition };
}

export { useGeolocation };
