import { useState } from "react";


export const usePlat = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const createPlat = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/plat/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error);
            }

            const json = await response.json();
            localStorage.setItem('plat', JSON.stringify(json));

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { createPlat, isLoading, error };
};
